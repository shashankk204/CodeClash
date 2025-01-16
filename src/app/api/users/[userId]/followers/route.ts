import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { FollowerInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params  }: { params: { userId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {userId}=params
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: {
            followerId: session.user?.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params  }: { params: { userId: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {userId} = await params
    await prisma.$transaction([
      prisma.follow.upsert({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: userId,
          },
        },
        create: {
          followerId:session.user.id,
          followingId: userId,
        },
        update: {},
      }),
      prisma.notification.create({
        data: {
          issuerId: session.user.id,
          recipientId: userId,
          type: "FOLLOW",
        },
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params  }: { params: { userId: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id)  {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {userId} = await params;

    await prisma.$transaction([
      prisma.follow.deleteMany({
        where: {
          followerId: session.user.id,
          followingId: userId,
        },
      }),
      prisma.notification.deleteMany({
        where: {
          issuerId: session.user.id,
          recipientId: userId,
          type: "FOLLOW",
        },
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}