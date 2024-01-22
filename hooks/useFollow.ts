'use client';

import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId?:string) => {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(userId as string)

    const loginModal = useLoginModal();

    const isFollowing = useMemo(()=>{
        const list = currentUser?.followingIds || [];

        return list.includes(userId)
    },[currentUser.followingIds, userId])

    const toggleFollow = useCallback(async()=>{
        if(!currentUser) return loginModal.onOpen();

        try {
            let request;
            let message;
            if(isFollowing) {
                request = () => axios.delete('/api/follow',{ data: { userId }})
                message = '팔로우 취소 완료!'
            } else {
                request = () => axios.post('/api/follow',{ data: { userId }})
                message = '팔로우 완료!'
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();
            toast.success(message)
        } catch (error) {
            toast.error('에러!')
        }

    },[currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser])

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;
