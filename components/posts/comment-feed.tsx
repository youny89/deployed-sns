import { Comment, User } from "@prisma/client"
import CommentItem from "./comment-item"

interface CommentProps {
    commets: Comment[] & {
        user:User
    }
}



const CommentFeed:React.FC<CommentProps> = ({commets=[]}) => {
    return (
        <>
            {commets?.map(comment=> (
                <CommentItem key={comment?.id} comment={comment}/>
            ))}
        </>
    )
}

export default CommentFeed;