'use client';

import { BsHouseFill, BsBellFill} from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import Logo from './logo'
import SidebarItem from './sidebar-item'
import { BiLogOut } from 'react-icons/bi'
import SidebartTweetButton from './sidebar-tweet-button'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
    const items = [
        {
            label:'홈',
            href:"/",
            icon:BsHouseFill
        },
        {
            label:'알림',
            href:"/notification",
            icon:BsBellFill,
            auth:true,
            alert:currentUser?.hasNotification
        },
        {
            label:'프로필',
            href:`/users/${currentUser?.id}`,
            icon:FaUser,
            auth:true
        },
    ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6 '>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <Logo />
                    {items.map(item=>(
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            auth={item.auth}
                            alert={item.alert}
                        />
                    ))}
                    {currentUser && (
                        <SidebarItem onClick={()=> signOut()} href="#" icon={BiLogOut} label='로그아웃'/>
                    )}
                    <SidebartTweetButton />
                </div>

            </div>
        </div>
    )
}

export default Sidebar