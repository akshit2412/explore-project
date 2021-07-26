import mongoose from 'mongoose';

const googleSchema = mongoose.Schema({
    email: { type: String, required: true },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model("Google", googleSchema);