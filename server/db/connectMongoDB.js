import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected DB")
        
    } catch (error) {
        console.log("DB ERROR",error)
    }
}