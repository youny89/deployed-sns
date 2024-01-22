import prisma from "@/libs/prisma";
import auth from "@/libs/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET (request:Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        let posts;
        if(userId) {
            posts = await prisma.post.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include:{ user: true, comments: true }
            })
        } else {
            posts = await prisma.post.findMany({
                orderBy: { createdAt: 'desc' },
                include:{ user: true, comments: true }
            })
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.log(error,'ERROR_POSTS_GET');
        return new NextResponse('SERVER ERROR',{status:500});
    }

} 

export async function POST (request:Request) {
    try {
        const { currentUser } = await auth();
        const { body } = await request.json();
        
        if(!currentUser?.id) return new NextResponse('로그인 해주세요',{ status:401});
        if(!body) return new NextResponse('Bad Request',{status:400});

        const posts = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        })

        return NextResponse.json(posts);

    } catch (error) {
        console.log(error,'ERROR_POSTS_POST')       
        return new NextResponse('SERVER ERROR',{status:500});
    }
}