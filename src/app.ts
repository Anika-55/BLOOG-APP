import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { postRouter } from './modules/post/post.router';
import { auth } from './lib/auth';
import cors from'cors'

const app = express();
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(cors({
  origin: "http://localhost:4000",
  credentials: true,   
}));
app.use(express.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => {
    res.send('Hello, World!');
});
export default app;