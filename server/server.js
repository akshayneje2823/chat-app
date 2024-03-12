import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import messageRoute from './routes/message.route.js'
import userRoute from './routes/user.route.js'
import { connectDB } from "./db/connectMongoDB.js";
import { app, server } from "./socket/server.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cookieParser()); // cookie reader

app.use("/api/auth", authRouter);
app.use('/api/message',messageRoute);
app.use('/api/users',userRoute);


// socket server
server.listen(PORT, () => {
  connectDB();
  console.log("Server is running " + PORT);
});
