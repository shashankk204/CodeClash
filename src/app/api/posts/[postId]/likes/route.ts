
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { LikeInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user || session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likes: {
          where: {
            userId:  session.user.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const data: LikeInfo = {
      likes: post._count.likes,
      isLikedByUser: !!post.likes.length,
    };
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.like.upsert({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
      create: {
        userId:  session.user.id,
        postId,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.like.deleteMany({
      where: {
        userId:  session.user.id,
        postId,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}