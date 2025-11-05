import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    imgUrl: { type: String, default: "default.jpg" },
    // info: type dictionary, default empty dictionary
    info: { type: Map, of: String, default: {} },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: "General" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);