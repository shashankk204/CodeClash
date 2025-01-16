import { PostsPage } from "@/lib/types";
import { UpdateUserProfileValues } from "@/lib/zod";
import {
    InfiniteData,
    QueryFilters,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile } from "./action";

export function useUpdateProfileMutation() {
    const { toast } = useToast();

    const router = useRouter();

    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: async ({values}: {values: UpdateUserProfileValues;}) => {
            return Promise.all([
                updateUserProfile(values),
            ]);
        },
        onSuccess: async ([updatedUser]) => {

            const queryFilter: QueryFilters = {
                queryKey: ["post-feed"],
            };

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                // @ts-ignore
                queryFilter,
                (oldData) => {
                    if (!oldData) return;

                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map((page: any) => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.map((post: any) => {
                                if (post.user.id === updatedUser.id) {
                                    return {
                                        ...post,
                                        user: {
                                            ...updatedUser,
                                        },
                                    };
                                }
                                return post;
                            }),
                        })),
                    };
                },
            );

            router.refresh();

            toast({
                description: "Profile updated",
            });
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to update profile. Please try again.",
            });
        },
    });

    return mutation;
}