import authOptions from '@/app/api/auth/options';
import prisma from '@/libs/prisma'
import { getServerSession } from "next-auth";

const auth = async () => {
    // When called getSEssion() will send a request to api/auth/session and return a promise with session object or null
    const session = await getServerSession(authOptions);
    if(!session?.user?.email) throw new Error('로그인 해주세요')

    const currentUser = await prisma?.user.findUnique({
        where : { email : session?.user.email }
    });

    if(!currentUser) throw new Error('로그인 유저를 찾을수 없습니다. 로그인 해주세요')

    return { currentUser };
}

export default auth;