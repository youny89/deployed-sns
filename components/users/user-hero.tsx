import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../avatar";

interface UserHeroProps {
    userId: string;
}

const UserHero:React.FC<UserHeroProps> = ({userId}) => {
  const {data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image 
            src={fetchedUser.coverImage}
            fill
            alt="cover image"
            style={{objectFit:"cover"}}
          />
        )}
        <div className="absolute  left-4 -bottom-16">
          <Avatar userId={userId} isLarge hasBorder/>
        </div>
      </div>
    </div>
  )
}

export default UserHero