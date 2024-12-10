//
import bcrypt from "bcryptjs";
import * as queryFunctions from "../models/userModel.js";


//sign up
export const signUp_post = async (req, res) => {
    const { username, password, age } = req.body;
    if (!username || !password || !age) {
        return res.status(401).json({ message: "Invaild input in required field(s).", status: 401 });
    }
    const checkExistence = await queryFunctions.getOneUser(username);
    if (checkExistence) {
        return res.status(409).json({ message: "Username already exists!", status: 409 });
    }

    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            username,
            password: passwordHash,
            age
        };
        await queryFunctions.createUser(newUser);
        const user = await queryFunctions.getOneUser(newUser.username);
        res.status(201).json({
            message: "Successfully created user!",
            user,
            status: 201
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};


//sign in
export const signIn_post = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "Invaild input in required field(s).", status: 401 });
    }
    const user = await queryFunctions.getOneUserAndPassword(username);
    if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credentials", status: 401 });
    }


    // if we reach this point, user is authenticated
    try {
        const confirmedUser = await queryFunctions.getOneUser(username);
        res.status(200).json({
            message: "Login successful.",
            user: confirmedUser,
            status: 200
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
};