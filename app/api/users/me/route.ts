import auth from "@/libs/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET () {
    try {
        const { currentUser } = await auth();
        return NextResponse.json(currentUser);
    } catch (error) {
        console.log(error, 'ERROR_ME');
        return new NextResponse('SERVER ERROR',{status:500});
    }
}