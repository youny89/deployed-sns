
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import {BsDot} from 'react-icons/bs'

interface SidebarItemProps {
    href?:string;
    icon:IconType;
    label:string;
    onClick?:()=>void;
    auth?:boolean;
    alert?:boolean;
}

const SidebarItem:React.FC<SidebarItemProps> = ({href, icon:Icon, label, onClick, auth, alert}) => {
  const router = useRouter();
  const {data : currentUser} = useCurrentUser();
  const loginModal = useLoginModal();

  const  handleClick = useCallback(()=>{
    if(onClick) return onClick();
  
    if(auth && !currentUser) {
      loginModal.onOpen();
    } else if(href) {
      router.push(href)
    }
    
  },[router, onClick, href, currentUser, auth, loginModal])
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
        {/* Mobile */}
        <div className="lg:hidden relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
            <Icon size={28} color="white"/>
            {alert && ( <BsDot size={70} className="text-sky-500 absolute -top-4 left-0"/> )}
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex  relative rounded-full items-center lg:justify-center lg:gap-3 px-4 py-2 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
            <Icon size={20} color="white"/>
            <p className="text-white">{label}</p>
            {alert && ( <BsDot size={60} className="text-sky-500 absolute -top-4 left-0" /> )}
        </div>

    </div>
  )
}

export default SidebarItem