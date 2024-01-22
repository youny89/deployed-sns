import NextAuth, { AuthOptions } from 'next-auth';

import bcryptjs from 'bcryptjs'
import CredentialsProvider  from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prisma';

export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{ label:"이메일", type:"text"},
                password: { label:"비밀번호", type:"password"}
            },
            async authorize (credentials) {
                if(!credentials?.email || !credentials?.password) throw new Error('bad request');

                const user = await prisma.user.findUnique({
                    where : { email: credentials.email }
                });

                if(!user || !user?.hashedPassword) throw new Error('존재하지 않는 메일 이거나 이미 사용중인 메일주소입니다. 소셜 로그인 이용해보세요!')

                const isMatched = await bcryptjs.compare(credentials.password, user.hashedPassword);
                if(!isMatched) throw new Error('bad request');

                return user;
            }
        })
    ],
    debug:process.env.NODE_ENV === 'development',
    session: { strategy: 'jwt' },
    jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }