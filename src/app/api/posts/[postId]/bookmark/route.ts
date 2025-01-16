import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { BookmarkInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const session= await auth();

    if (!session || !session.user || !session.user.id ) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const session= await auth();

    if (!session || !session.user || !session.user.id ) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {postId}=await params
    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
      create: {
        userId: session.user.id,
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
  { params }: { params: { postId: string } },
) {
  try {
    const session= await auth();

    if (!session || !session.user || !session.user.id ) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {postId}=await params
    await prisma.bookmark.deleteMany({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}