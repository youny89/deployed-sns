import { NextResponse } from "next/server"
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic';

interface IParams {
    params: { postId: string }
}

export async function GET (request:Request, { params }: IParams ) {

    try {
        if(!params.postId) return new NextResponse('Invalid ID',{ status:400});
        const post = await prisma.post.findUnique({ 
            where : { id: params.postId },
            include: {
                user: true,
                comments: {
                    include: { user : true }
                }
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log(error,'ERROR_POSTID_GET')
        return new NextResponse('SERVER ERROR',{status:500});
    }
}