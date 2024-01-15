import prisma from '@/app/libs/prisma.db';
import { getSession, useSession } from 'next-auth/react';
import getSessionEmail from './session';



export const getCurrentUser = async () => {
    try {
        const session = await getSessionEmail();


        if (!session?.user?.email) {
            return null
        }


        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if (!currentUser) {
            return null
        }

        return currentUser;

    } catch (err: any) {
        return null;
    }
};
