import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from "react";
import Button from "../button";
import { BiCalendar } from "react-icons/bi";
import useEditUserModal from "@/hooks/useEditUserModal";
import { timeAgo } from "@/libs/utils";
import useFollow from "@/hooks/useFollow";

interface UserHeroProps {
    userId: string;
}


const UserBio:React.FC<UserHeroProps> = ({userId}) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedUser } = useUser(userId)

    const editUserModal = useEditUserModal();
    const {isFollowing, toggleFollow} = useFollow(userId);
    const createdAt = useMemo(()=>{
        if(!fetchedUser?.createdAt) return null;
        return timeAgo(fetchedUser?.createdAt.toString())
    },[fetchedUser.createdAt])

    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {currentUser?.id === userId ? (
                    <Button label="수정" secondary onClick={()=>editUserModal.onOpen()}/>
                ): (
                    <Button label={isFollowing ? '팔로우 취소' :'팔로우 하기'} secondary={!isFollowing} outline={!isFollowing} onClick={toggleFollow}/>
                )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {fetchedUser?.name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.username}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {fetchedUser?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
                        <BiCalendar size={24}/>
                        <p>가입날짜: {createdAt}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center gap-6 mt-4 px-4">
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white">
                        {fetchedUser?.followingIds?.length}
                    </p>
                    <p className="text-neutral-400">
                        followings
                    </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white">
                        {fetchedUser?.follwersCount || 0}
                    </p>
                    <p className="text-neutral-400">
                        followers
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserBio