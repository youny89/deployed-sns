'use client';

import Header from "@/components/header"
import PostFeed from "@/components/posts/post-feed";
import UserBio from "@/components/users/user-bio";
import UserHero from "@/components/users/user-hero";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

const UserView = () => {
    const params = useParams<{userId:string}>();
    const { data:fetchedUser, isLoading } = useUser(params.userId as string);

    if(isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader size={80} color="lightblue"/>
            </div>
        )
    }
    return (
        <>
            <Header label={`${fetchedUser.name}님 프로필`} showBackArrow />
            <UserHero userId={params?.userId as string}/>
            <UserBio userId={params?.userId as string}/>
            <PostFeed userId={params?.userId as string}/>
        </>
    )
}

export default UserView