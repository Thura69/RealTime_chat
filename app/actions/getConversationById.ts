import prisma from '../libs/prisma.db';
import { getCurrentUser } from './getCurrentUser';

export const getConversationById = async (conversationId:string) => {
    try { 
        const currentUser = await getCurrentUser();
        if (!currentUser?.email) {
            return null
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                user:true
            }
        });


        return conversation


    } catch (e: any) {
       return null
   } 
}