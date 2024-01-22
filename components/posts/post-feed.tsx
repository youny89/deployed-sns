'use client';

import usePosts from "@/hooks/usePosts";
import PostItem from "./post-item";
import { ClipLoader } from 'react-spinners'

interface PostFeedProps {
    userId?: string;
}

const PostFeed:React.FC<PostFeedProps> = ({userId}) => {
    const { data:posts = [], isLoading } = usePosts(userId);

    if(isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <ClipLoader size={80} color="lightblue"/>
            </div>
        )
    }

    return (
        <>
            {posts.map((post:any) => (
                <PostItem userId={userId as string} data={post} key={post.id}/>
            ))}
        </>
    )
}

export default PostFeed