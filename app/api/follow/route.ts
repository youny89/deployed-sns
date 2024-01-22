import prisma from "@/libs/prisma"
import auth from "@/libs/auth"
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST (request:Request) {
    try {
        const  body = await request.json();
        const { data: { userId } } = body;
        console.log('body:', body);
        const { currentUser } = await auth();
        if(!userId || typeof userId !== 'string') return new NextResponse('유효하지 않은 유저 ID.', {status:400})
        if(!currentUser.id) return new NextResponse('로그인 해주세요',{status:401});

        const isFollowing = currentUser.followingIds.includes(userId);
        if(isFollowing) return new NextResponse('이미 팔로잉 중입니다.', {status:400});

        const updatedFollowingIds = currentUser.followingIds || []
        updatedFollowingIds.push(userId);

        const updatedUser = await prisma.user.update({
            where : { id: currentUser.id },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error,"ERROR_FOLLOW_POST")
        return new NextResponse('SERVER ERROR',{status:500});
    }
}

export async function DELETE (request:Request) {
    try {
        const  body = await request.json();
        const  { userId }  = body;

        const { currentUser } = await auth();
        if(!userId || typeof userId !== 'string') return new NextResponse('유효하지 않은 유저 ID.', {status:400})
        if(!currentUser.id) return new NextResponse('로그인 해주세요',{status:401});

        const isFollowing = currentUser.followingIds.includes(userId);
        if(!isFollowing) return new NextResponse('팔로잉 먼저 해주세요.', {status:400});

        const updatedFollowingIds =  currentUser.followingIds.filter(id=> id !== userId)
        const updatedUser = await prisma.user.update({
            where : { id: currentUser?.id },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error,"ERROR_FOLLOW_DELETE")
        return new NextResponse('SERVER ERROR',{status:500});
    }
}