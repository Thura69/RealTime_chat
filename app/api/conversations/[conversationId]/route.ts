
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server"
import prisma from '../../../libs/prisma.db';
import { pusherServer } from "@/app/libs/pusher";

interface IParams{
    conversationId?:string
}

export async function DELETE(request:Request,{params}:{params:IParams}) {
    try { 
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser) return new NextResponse('Unauthorized', { status: 401 });

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                user:true
            }
        });

        if (!existingConversation) return new NextResponse('Invalid ID', { status: 400 });


        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });


        existingConversation.user.forEach( (user) => {
            if (user.email) {
                 pusherServer.trigger(user.email, "conversation:remove", existingConversation);
            }
        });
        

        return NextResponse.json(deletedConversation);

    } catch (e: any) {
        console.log(e,"DELETE ERROR")
        return new NextResponse("Internal Error",{status:500})
    }
}