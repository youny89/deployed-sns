import auth from "@/libs/auth";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function  POST (request:Request) {
    try {
        const { currentUser } = await auth();
        const url = new URL(request.url);
        const postId = url.searchParams.get('postId')
        const { body } = await request.json();
        if(!currentUser?.id) return new NextResponse('로그인 해주세요',{status:401});
        if(!postId) return new NextResponse('Invalid Post ID',{status:400});
        if(!body) return new NextResponse('Bad Request',{status:400});

        const comments = await prisma.comment.create({
            data: {
                body,
                postId,
                userId:currentUser?.id
            }
        });


        // Notification try-catch blocks
        try {
            const post = await prisma.post.findUnique({ where: {id: postId }});
            if(post?.userId) {
                const notificationBody = `${currentUser.name}님이 댓글을 달았습니다.`;

                await prisma.notification.create({
                    data: {
                        body:notificationBody,
                        userId:post.userId
                    }
                });

                await prisma.user.update({
                    where : { id: post?.userId },
                    data: {
                        hasNotification: true
                    }
                })

                console.log('알림 업데이트 완료!');
            }
    
            
        } catch (error) {
            console.log(error,'ERROR_NOTIFICATION_COMMENT');
        }

        return NextResponse.json(comments);

    } catch (error) {
        console.log(error,'ERROR_COMMENTS_POST')
        return new NextResponse('SERVER ERROR',{status:500});
    }
    
}