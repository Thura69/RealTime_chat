import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '../../../../libs/prisma.db';
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId?: string,
    
};

export async function POST  (request:Request,{params}:{params:IParams}) {
    try {
        const currentUser = await getCurrentUser();

        const { conversationId } = params;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //find the conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                user:true
            }
        });

        if (!conversation) {
            return new NextResponse('Invalid Id', { status: 404 });
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) return NextResponse.json(conversation);

        const updateMessages = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        await pusherServer.trigger(currentUser.email, "conversation:update", {
            id: conversationId,
            messages: [updateMessages]
        });

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId!,"message:update",updateMessages)

        return NextResponse.json(updateMessages);

     } catch (err: any) {
        console.log("Error Message Seen", err)
        return new NextResponse("Internal Error",{status:500})
    }
}