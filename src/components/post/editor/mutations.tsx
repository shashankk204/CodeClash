// import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/lib/types";
import {
    InfiniteData,
    QueryFilters,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./action";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export function useSubmitPostMutation() {
    const { toast } = useToast();

    const session=useSession();

    if(session.status==='loading') return <Loader2 className="mx-auto my-3 animate-spin" />

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: submitPost,
        onSuccess: async (newPost) => {
            const queryFilter = { queryKey: ["post-feed"],
                predicate(query)
                {
                    return query.queryKey.includes("for-you")||
                    (query.queryKey.includes('user-posts') &&
                    query.queryKey.includes(session.data?.user?.id)
                    )
                }

             }satisfies QueryFilters ;
            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                //@ts-ignore
                queryFilter,
                (oldData) => {
                    const firstPage = oldData?.pages[0];

                    if (firstPage) {
                        return {
                            pageParams: oldData.pageParams,
                            pages: [
                                {
                                    posts: [newPost, ...firstPage.posts],
                                    nextCursor: firstPage.nextCursor,
                                },
                                ...oldData.pages.slice(1),
                            ],
                        };
                    }
                },
            );

            queryClient.invalidateQueries({
                queryKey: queryFilter.queryKey,
                predicate(query) {
                    return queryFilter.predicate(query) && !query.state.data;
                },
            });

            toast({
                description: "Post created",
            });
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to post. Please try again.",
            });
        },
    });

    return mutation;
}