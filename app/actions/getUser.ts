import prisma from '../libs/prisma.db';
import getSessionEmail from './session';

export const getUser = async () => {
    const session = await getSessionEmail();

    if (!session?.user?.email) {
        return []
    };

    try { 
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return users;
    } catch (e: any) {
        return []
    }

}