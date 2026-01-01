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
        res.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
}

const getAllPost = async (req:Request,res:Response) => {
    try {
        const { search } = req.query
        const searchString = typeof search === 'string' ? search : undefined
        const result = await postService.getAllPost({search:searchString})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
}

export const postController = {
    createPost,
    getAllPost
}