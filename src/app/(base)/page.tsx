import PostEditor from "@/components/post/editor/PostEditor";
import Post from "@/components/post/post";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/db";
import { postDataInclude } from "@/lib/types";
import ForYouFeed from "./ForYouFeed";

export default  function Home() {
  
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed></ForYouFeed>
      </div>
      <TrendsSidebar />
    </main>
  );
}