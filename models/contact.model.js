import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true, lowercase: true },
    subject: { type: String, require: true, trim: true, },
    message: { type: String, require: true, trime: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" }
}, { timestamps: true });

export const ContactModel = mongoose.models.CONTACT || mongoose.model("CONTACT", ContactSchema);