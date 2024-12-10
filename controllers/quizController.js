//
import Image from "../models/imageModel.js";

//get one quiz
export const quiz_get = async (req, res) => {
    const id = req.params.id;
    const data = await Image.findOne({ imageID: id });
    //use below code to exclude field(s)
    //const data = await Image.findOne({ imageID: id }).select('-field1 -field2');
    if (!data) {
        return res.status(404).json({
            message: "Quiz with specified id doesn't exist!",
            status: 404
        });
    }

    try {
        res.status(200).json({
            message: "Data found!",
            data,
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: 500 });
    }
};


//check answer
export const check_answer = async (req, res) => {
    const id = req.params.id;
    const answer = req.body.answer;
    const data = await Image.findOne({ imageID: id });
    if (!data) {
        return res.status(404).json({
            message: "Quiz with specified id doesn't exist!",
            status: 404
        });
    }

    try {
        if (answer == data.correctOption) {
            res.status(200).json({
                message: "Correct!",
                status: 200
            });
        } else {
            res.status(400).json({
                message: "Incorrect!",
                status: 400
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: 500 });
    }
};