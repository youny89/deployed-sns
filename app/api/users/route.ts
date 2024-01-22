import { NextResponse } from "next/server"
import prisma from '@/libs/prisma'
import auth from "@/libs/auth";

export async function GET (req:Request) {
    try {
        const users = await prisma.user.findMany({
            orderBy:{ createdAt:"desc"}
        })
        return NextResponse.json(users);
    } catch (error) {
        console.log(error,'ERROR_USERS')
        return new NextResponse('SERVER ERROR',{status:500})
    }
}

export async function PATCH (req:Request) {
    try {
        const { currentUser } = await auth();
        const body = await req.json();
        const {name, username, bio, profileImage,coverImage} = body

        if(!currentUser?.id) return new NextResponse('로그인 해주세요',{status:401})
        if(!name && !username && !bio && !profileImage && !coverImage) return new NextResponse('Bad reqeust',{status:400})

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                name, username, bio, profileImage,coverImage
            }
        })
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error,'ERROR_USERS_PATCH')
        return new NextResponse('SERVER ERROR',{status:500})
    }
}