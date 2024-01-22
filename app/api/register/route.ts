import prisma from '@/libs/prisma'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server';

export async function POST (req:Request) {
    try {
        const body = await req.json();
        const { email, password, name, username } = body;
        const hashedPassword = await bcryptjs.hash(password,10)
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        }) 

        return NextResponse.json(user);
    } catch (error) {
        console.log(error,"ERROR_REGISTER");
        return new NextResponse('SERVER ERROR',{status:500})
    }
}