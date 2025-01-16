"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/zod";

export async function submitPost(input: string) {
  const  session  = await auth();

    if (!session || !session.user?.id) 
    {
        throw new Error("Unauthorized");
    }
    const { content } = createPostSchema.parse({ content: input });

    const newPost = await prisma.post.create({
      data: {
        content,
        userId: session.user.id,
      },
      include: getPostDataInclude(session.user.id),
    });
  
    return newPost;
}