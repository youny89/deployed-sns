import { Notification } from "@prisma/client"
import { BsTwitterX } from "react-icons/bs"

interface NotificationItemProps {
    notification:Notification
}

const NotificationItem:React.FC<NotificationItemProps> = ({notification}) => {
  return (
    <div className="flex flex-row items-center gap-6 border-[1px] border-b-neutral-900 hover:bg-neutral-800">
         <BsTwitterX size={32}/>
         <div className="text-white">{notification?.body}</div>
    </div>
  )
}

export default NotificationItem