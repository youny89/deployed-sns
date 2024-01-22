import { Comment, User } from "@prisma/client"
import Avatar from "../avatar"
import { timeAgo } from "@/libs/utils"
import { useRouter } from "next/navigation"

interface CommentItemProps {
    comment: Comment & {
        user?: User
    }
}


const CommentItem:React.FC<CommentItemProps> = ({comment}) => {
    const router = useRouter();
    const goToUser = () => {
        router.push(`/users/${comment?.userId}`)
    }

    return (
        <div className="p-5 border-neutral-900 border-b-[1px] hover:bg-neutral-900 transition outline-none">
            <div className="flex items-center gap-3">
                <Avatar userId={comment?.userId}/>
                <div>
                    <div className="flex flex-row gap-3 items-center">
                        <span onClick={goToUser} className="text-white font-semibold hover:underline cursor-pointer">{comment?.user?.name}</span>
                        <span onClick={goToUser} className="text-neutral-500 text-sm hidden md:block hover:underline">@{comment?.user?.username}</span>
                        <span className="text-neutral-500 text-sm">{timeAgo(comment?.createdAt?.toString())}</span>
                    </div>
                    <div className="text-white">{comment?.body}</div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem