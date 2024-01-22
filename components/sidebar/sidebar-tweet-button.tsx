'use client';

import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation"
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebartTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const onClick = useCallback(()=>{
        loginModal.onOpen();
    },[loginModal])

    return (
        <div onClick={onClick}>
            {/* Mobile */}
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
                <FaFeather size={26} color="white"/>
            </div>
            {/* Desktop */}
            <div className="mt-6 hidden lg:flex lg:items-center lg:justify-center lg:gap-4 px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
                <p className="hidden lg:block  text-center font-semibold text-white">Tweet</p>
                <FaFeather size={20} color="white"/>
            </div>

        </div>
    )
}

export default SidebartTweetButton