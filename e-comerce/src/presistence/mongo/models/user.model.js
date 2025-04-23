import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    fullName: String,
    email: { type: String, unique: true },
    birthDate: { type: Date },
    password: String,
    role: { type: String, default: "user" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" }
})

export const userModel = mongoose.model(userCollection, userSchema)