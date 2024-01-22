'use client'

/**
 * Creat new post or new comment
 */

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisgterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./button";
import Avatar from "./avatar";
import usePost from "@/hooks/usePost";

interface PostFormProps {
    placeholder:string;
    isComment?:boolean;
    postId?:string;
}


const PostForm:React.FC<PostFormProps> = ({placeholder, isComment=false, postId}) => {

    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const registerMoal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data:currentUser} = useCurrentUser();
    const { mutate:mutatePosts } = usePosts()
    const { mutate:mutatePost } = usePost(postId as string)

    const onSubmit = useCallback(async()=>{
        const url = isComment ? `/api/comments?postId=${postId}`:'/api/posts'
        const message = isComment ? '댓글을 달았습니다!':'트윗을 생성 했습니다!';
        try {
            setIsLoading(true)
            await axios.post(url,{ body });
            toast.success(message);
            setBody('')

            // once we successfully create a new post, we want to mutate our existing posts
            // so it loads all the new ones including newly created one.
            mutatePosts() 
            mutatePost()
        } catch (error) {
            toast.error('SERVER ERROR')
        } finally {
            setIsLoading(false);
        }
    },[body, mutatePosts,postId,isComment, mutatePost])

    if(!currentUser) {
        return (
            <div className="border-b-[1px] border-neutral-800 px-5 py-2">
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">
                        Welcome to twitter
                    </h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button label="로그인" onClick={()=> loginModal.onOpen()}/>
                        <Button label="회원가입" secondary onClick={()=> registerMoal.onOpen()}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar userId={currentUser?.id}/>        
                </div>
                <div className="w-full">
                    <textarea
                        className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
                        placeholder={placeholder}
                        disabled={isLoading}
                        onChange={e=> setBody(e.target.value)}
                        value={body}
                    ></textarea>
                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition"/>
                    <div className="mt-4 flex flex-row justify-end">
                        <Button label="트윗" disabled={isLoading || !body} onClick={onSubmit}/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostForm