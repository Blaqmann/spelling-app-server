import express from "express";
import * as authController from "../controllers/authController.js";
import * as quizController from "../controllers/quizController.js";


const router = express.Router();


//onboarding and offboarding
router.post("/sign-up", authController.signUp_post);
router.post("/sign-in", authController.signIn_post);

//spelling quiz
router.get("/get-quiz/:id", quizController.quiz_get);
router.post("/check-answer/:id", quizController.check_answer);



export default router;