import Avatar from "@/components/avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import useLoginModal from "@/hooks/useLoginModal";
import {PulseLoader } from 'react-spinners'
import { timeAgo } from "@/libs/utils";
import { Comment, Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";

interface PostItemProps {
    userId?:string;
    data:Post & {
        user: User
        comments:Comment[]
    };
}

const PostItem:React.FC<PostItemProps> = ({userId, data}) => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser();
    const {toggleLike, hasLiked, isLoading} = useLike({userId:userId, postId:data.id})

    const goToUser = useCallback((event:any)=>{
        event.stopPropagation();
        router.push(`/users/${data?.user?.id}`)
    },[router, data?.user?.id])
    
    const goToPost = useCallback(()=>{
        router.push(`/posts/${data?.id}`)
    },[router, data?.user?.id])


    const onLike = useCallback(async(event:any)=>{
        event.stopPropagation()
        if(!currentUser) {
            loginModal.onOpen();
            return;
        }
        await toggleLike()
    },[loginModal])

    const createdAt = useMemo(()=>{
        if(!data?.createdAt) return null;
        return timeAgo(data.createdAt.toString())
    },[data?.createdAt])

    return (
        <div onClick={goToPost} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id}/>
                <div>
                    <div className="flex flex-rwo items-center gap-2">
                        <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">{data?.user?.name}</p>
                        <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">@{data?.user?.username}</span>
                        <span className="text-neutral-500 text-sm">{createdAt}</span>
                    </div>
                    <div className="text-white mt-1">{data.body}</div>
                    <div className="flex flex-row items-center mt-3 gap-3">
                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                            <AiOutlineMessage size={20}/>
                            <p>{data?.comments?.length || 0}</p>
                        </div>
                        <div onClick={onLike} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-rose-500">
                            {isLoading 
                                ? <PulseLoader size={10} color="white"/> : (
                                    hasLiked ? (<BsFillHeartFill size={16} className="text-rose-500"/>) : (<BiHeart size={20}/>)
                                )
                            }
                                <p>{data?.likedIds.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem