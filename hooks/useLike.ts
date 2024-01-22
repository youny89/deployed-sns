import { useCallback, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";

interface Params {
    postId:string
    userId?:string
}

const useLike = ({postId, userId}:Params) => {
    const { data:  currentUser} = useCurrentUser();
    const { data: fetchedPost, mutate:mutateFetchedPost } = usePost(postId)
    const { mutate:mutateFetchedPosts } = usePosts(userId)
    const [isLoading, setIsLoading] = useState(false);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(()=>{
        const list = fetchedPost?.likedIds || [];
        return list.includes(currentUser?.id)
    },[fetchedPost, currentUser]);

    const toggleLike = useCallback(async ()=>{
        if(!currentUser) return loginModal.onOpen();
        setIsLoading(true);
        try {
            let request;
            if(hasLiked) {
                request = () => axios.delete('/api/like',{data: { postId }})
            } else {
                request = () => axios.post('/api/like',{ postId })
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();
            toast.success('Success')
        } catch (error) {
            toast.error('Failed.')
        } finally {
            setIsLoading(false);
        }
    },[currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal])

    return {
        hasLiked,
        toggleLike,
        isLoading
    }
}

export default useLike;