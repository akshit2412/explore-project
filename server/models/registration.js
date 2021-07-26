import mongoose from 'mongoose';

const regSchema = mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
})

export default mongoose.model("Temp", regSchema);