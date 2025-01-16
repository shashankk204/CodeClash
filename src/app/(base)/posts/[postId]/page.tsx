import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";
import Post from "@/components/post/post";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserToolTip";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getPostDataInclude, UserData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

interface PageProps {
  params: { postId: string };
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();

  return post;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) return {};
    const {postId} = await params
  const post = await getPost(postId,session.user.id);

  return {
    title: `${post.user.displayname}: ${post.content.slice(0, 50)}...`,
  };
}

export default async function Page({ params }: PageProps) {
  const session= await auth();

  if (!session || !session.user || !session.user.id) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }
  const {postId}=await params
  const post = await getPost(postId, session.user.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Post post={post} />
      </div>
      <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
}

interface UserInfoSidebarProps {
  user: UserData;
}

async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
  const session= await auth();

  if (!session || !session.user || !session.user.id)return null;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">About this user</div>
      <UserTooltip user={user}>
        <Link
          href={`/users/${user.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar url={user.avatarUrl||undefined} className="flex-none" />
          <div>
            <p className="line-clamp-1 break-all font-semibold hover:underline">
              {user.displayname}
            </p>
            <p className="line-clamp-1 break-all text-muted-foreground">
              @{user.username}
            </p>
          </div>
        </Link>
      </UserTooltip>
      <Linkify>
        <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
          {user.bio}
        </div>
      </Linkify>
      {user.id !== session.user.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === session.user?.id,
            ),
          }}
        />
      )}
    </div>
  );
}