import prisma from '@/libs/prisma'
import { NextResponse } from "next/server"

interface IParams {
    params : { userId: string}
}


export async function GET (reqeust:Request, { params }: IParams ) {
    try {
        if(!params?.userId) return new NextResponse('Invalid ID',{status:400});
        const notifications = await prisma.notification.findMany({
            where : { userId: params?.userId },
            orderBy: { createdAt:"desc"}
        })
        console.log({notifications});
        await prisma.user.update({
            where : { id: params?.userId },
            data: { hasNotification: false}
        })

        return NextResponse.json(notifications);
    } catch (error) {
        console.log(error,'ERROR_NOTIFICACTIONS_USERID_GET')
        return new NextResponse('SERVER ERROR',{status:500});
    }
}