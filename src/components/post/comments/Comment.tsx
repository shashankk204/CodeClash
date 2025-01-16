import { CommentData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import CommentMoreButton from "./CommentMoreButton";
import UserTooltip from "@/components/UserToolTip";
import Linkify from "@/components/Linkify";

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
    const session = useSession();
    if(session.status==='loading') return <Loader2 className="mx-auto my-3 animate-spin" />;


  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar url={comment.user.avatarUrl||undefined} size={"40"} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className="font-medium hover:underline"
            >
              {comment.user.displayname}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <div>
        <Linkify>
          {comment.content}
        </Linkify>
        </div>
      </div>
      {comment.user.id === session.data?.user?.id && (
        <CommentMoreButton
          comment={comment}
          className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
        />
      )}
    </div>
  );
}