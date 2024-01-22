import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePost = (postId: string) => {
    const url = postId ? `/api/posts/${postId}` : null;
    const { data, isLoading, mutate, error } = useSWR(url, fetcher);

    return { data, isLoading, mutate, error }
}

export default usePost;