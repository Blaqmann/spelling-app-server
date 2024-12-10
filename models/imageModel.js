//
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imageID: {
        type: Number,
        unique: true,
        required: [true, "Image must have an ID"]
    },
    name: {
        type: String,
        required: [true, "Image must have a name"]
    },
    description: {
        type: String,
        required: [true, "Image must have a description"]
    },
    options: {
        type: [String],
        required: [true, "Image must have options"]
    },
    correctOption: {
        type: String,
        required: [true, "Image must have a correct option"]
    }
});

const Image = mongoose.model("Image", imageSchema);


export default Image; // Default export
//module.exports = ImageModel;
//export { ImageModel }; // Named export