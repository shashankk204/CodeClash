"use client";

import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import PostMoreButton from "./PostMoreButton";
import { useSession } from "next-auth/react";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const user = useSession();
  if(user.status=='loading') return <></>
  
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar url={post.user.avatarUrl||undefined} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium hover:underline"
            >
              {post.user.displayname}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.data?.user?.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}