import express from "express";
import cors from "cors";
import AuthRouter from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import LectureRoute from "./routes/lectureRoutes.js";
import NoteRouter from "./routes/noteRoutes.js";
import tagRotuer from "./routes/tagRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import geminiRouter from "./routes/gemeniRoutes.js";
import tutorialRouter from "./routes/tutorialRoutes.js";
import labRouter from "./routes/labRoutes.js";
import ytLabRouter from "./routes/ytLabRoutes.js";
import { AsyncHandler } from "./utils/AsyncHandler.js";

import getReference from "./routes/referenceRoutes.js";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/lecture", LectureRoute);

app.use("/api/note", NoteRouter);
app.use("/api/tag", tagRotuer);
app.use("/api/getReference", getReference);
app.use("/api/ask", chatRouter);
app.use("/api/geminiCall", geminiRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/lab", labRouter);
app.use("/api/ytLab", ytLabRouter);

export default app;
