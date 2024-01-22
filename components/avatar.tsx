import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
    userId:string;
    isLarge?:boolean;
    hasBorder?:boolean;
}

const Avatar:React.FC<AvatarProps> = ({userId, isLarge, hasBorder}) => {
    const router = useRouter();
    const { data: fecthedUser } = useUser(userId)
    const onClick = useCallback((event:any)=>{
        event.stopPropagation();
        const url = `/users/${userId}`
        router.push(url);
    },[userId, router])
    return (
        <div className={`
            rounded-full hover:opacity-90 transition cursor-pointer relative
            ${hasBorder ? 'border-4' :''}
            ${isLarge ? 'h-32 w-32' :'h-12 w-12'}
        `}>
            <Image 
                fill
                style={{
                    objectFit:"cover",
                    borderRadius:"100%"
                }}
                alt="avatar"
                onClick={onClick}
                src={fecthedUser?.profileImage || '/images/placeholder.jpg'}
            />        
        </div>
    )
}

export default Avatar