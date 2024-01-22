'use client';

import Header from "@/components/header";
import PostForm from "@/components/post-form";
import CommentFeed from "@/components/posts/comment-feed";
import PostItem from "@/components/posts/post-item";
import usePost from "@/hooks/usePost";
import { useParams } from "next/navigation"
import { ClipLoader } from "react-spinners";

const PostView = () => {
    const params = useParams<{postId: string}>();
    const { data: fetchedPost, isLoading, error } = usePost(params?.postId)
    
    if(isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader size={80} color="lightblue"/>
            </div>
        )
    }
    if(!isLoading && error) {
        return <div className="flex justify-center items-center h-full">
            <h3>해당 포스트를 불러올수 없습니다!</h3>
        </div>
    }

    return (
        <>
            <Header label="트윗" showBackArrow/>
            <PostItem data={fetchedPost}/>
            <PostForm postId={params?.postId} isComment={true} placeholder="댓글을 달아보세요"/>
            <CommentFeed commets={fetchedPost?.comments}/>
        </>

    )
}

export default PostView