'use client';

import { ClipLoader } from 'react-spinners'
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotificatinos from "@/hooks/useNotificatinos"
import NotificationItem from './notification-item';
import { Notification } from '@prisma/client';
import { useEffect } from 'react';

const NotificationFeed = () => {
    
    const { data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
    const {data: fetchedNotifications=[], isLoading} = useNotificatinos(currentUser?.id);

    useEffect(()=>{
        mutateCurrentUser();
    },[mutateCurrentUser])

    console.log(isLoading, fetchedNotifications)

    if(isLoading) {
        return (
            <div className="flex items-center justify-center">
                <ClipLoader className='text-sky-500' size={80}/>
            </div>
        )
    }
    if(!isLoading && fetchedNotifications.length === 0) {
        return (
            <div className="text-neutral-500 p-6">
                새로운 소식이 없습니다!
            </div>
        )
    }
    return (
        <div className='flex flex-col'>
            {fetchedNotifications.map((notification:Notification)=>(
                <NotificationItem key={notification.id} notification={notification}/>
            ))}
        </div>
    )
}

export default NotificationFeed