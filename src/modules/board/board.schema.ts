import { z } from "zod";

export const CreateBoardSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3, "Description must be at least 3 characters"),
});

export const BoardSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type CreateBoardInput = z.infer<typeof CreateBoardSchema>;
export type BoardResponse = z.infer<typeof BoardSchema>;