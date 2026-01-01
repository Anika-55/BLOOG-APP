import { Request, Response } from "express";
import { postService } from "./post.service";



const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!req.user) {
            return res.status(400).json({
                error:"Unauthorized"
            })
        }
        const result = await postService.createPost(req.body,req.user.id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const postController = {
    createPost
}