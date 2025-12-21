import mongoose from "mongoose"

const AssetSchema = new mongoose.Schema({

    symbol: {
        type: String,
        required: true,
        uppercase: true
    },
    type: {
        type: String,
        enum: ["STOCK", "CRYPTO"],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

    name: {
        type: String,
        required: true
    },
    


}, { timestamps: true })


export const Asset = mongoose.model("Asset", AssetSchema);
