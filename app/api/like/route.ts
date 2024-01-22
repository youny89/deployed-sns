import auth from "@/libs/auth";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST (request:Request) {
    try {
        const {currentUser} = await auth();
        if(!currentUser?.id) return new NextResponse('로그인해주세요',{status:401}); 
        const { postId } = await request.json();
        if(!postId) return new NextResponse('Invalid ID',{status:400});
        const post = await prisma.post.findUnique({ where : { id: postId }});
        if(!post) return new NextResponse('Invalid ID',{status:400});

        const updatedLikedIds = [...post?.likedIds] || [];
        const hasLiked = updatedLikedIds.includes(currentUser?.id);
        if(hasLiked) return new NextResponse('이미 좋아요 했습니다.',{status:400});
        
        updatedLikedIds.push(currentUser?.id);
        const updatedPost = await prisma.post.update({
            where : { id : postId },
            data: { likedIds: updatedLikedIds }
        })

        // Notification try-catch block
        if(updatedPost?.userId) {
            const notificationBody = `${currentUser.name}님이 당신의 글을 좋아요 했습니디`;

            try {
                await prisma.notification.create({
                    data: {
                        body:notificationBody,
                        userId: updatedPost.userId
                    }
                });
                
                await prisma.user.update({
                    where : { id: updatedPost?.userId },
                    data: { hasNotification: true}
                })
                console.log('좋아요 알림 업데이트 완료.');
            } catch (error) {
                console.log(error,'ERROR_NOTIFICATION_LIKE')
            }
        }

        return NextResponse.json(updatedPost)
    } catch (error) {
        console.log(error,'ERROR_LIKE_POST')
        return new NextResponse('SERVER ERROR',{status:500})
    }
}
export async function DELETE (request:Request) {
    try {
        const { currentUser } = await auth();
        const {postId} = await request.json();
        if(!currentUser?.id) return new NextResponse('로그인 해주세요',{ status:401 });
        if(!postId) return new NextResponse('Invalid ID', {status:400});

        const post = await prisma.post.findUnique({ where:{ id: postId }});
        if(!post) return new NextResponse('Invalid ID',{status:401});

        const likedIds = [...post.likedIds] || [];
        const hasLiked = likedIds.includes(currentUser?.id);
        if(!hasLiked) return new NextResponse('Bad Reqeust',{status:400});

        const updatedLikedIds = likedIds.filter(id=> id !== currentUser?.id);

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { likedIds: updatedLikedIds }
        })

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.log(error,'ERROR_LIKE_DELETE')
        return new NextResponse('SERVER ERROR',{status:500})
    }
}