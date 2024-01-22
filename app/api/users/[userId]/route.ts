import { NextResponse } from "next/server"
import prisma from '@/libs/prisma'

interface IParams {
    params: { userId: string }
}

export async function GET (req:Request, {params}: IParams) {
    try {
        if(!params?.userId) return new NextResponse('No User ID',{status:400});

        const user = await prisma.user.findUnique({
            where : { id: params?.userId}
        });
        // we are going to fin all the users who follow ther user's id
        const follwersCount = await prisma.user.count({
            where: { followingIds: {
                has: params?.userId
            }}
        })

        return NextResponse.json({...user, follwersCount });
    } catch (error) {
        console.log(error,'ERROR_USERS_USER_ID')
        return new NextResponse('SERVER ERROR',{status:500})
    }
}