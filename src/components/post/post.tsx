"use client";

import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import PostMoreButton from "./PostMoreButton";
import { useSession } from "next-auth/react";
import Linkify from "../Linkify";
import UserTooltip from "../UserToolTip";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Comments from "./comments/Comments";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const user = useSession();
  const [showComments, setShowComments] = useState(false);
  if(user.status=='loading') return <></>
  
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
        <UserTooltip user={post.user}>
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar url={post.user.avatarUrl||undefined} />
          </Link>
          </UserTooltip>
          <div>
          <UserTooltip user={post.user}>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium hover:underline"
            >
              {post.user.displayname}
            </Link>
            </UserTooltip>
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
      <Linkify>
      <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.data?.user?.id),
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user.data?.user?.id,
            ),
          }}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  );
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}