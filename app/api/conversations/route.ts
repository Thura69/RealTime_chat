import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../libs/prisma.db';
import { pusherServer } from "@/app/libs/pusher";


export async function POST(
    request:Request
) {
    try { 
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { 
            userId,
            isGroup,
            members,
            name
        } = body;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse('Unauthorized',{status:401})
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid Data",{status:400})
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    user: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })), {
                                id: currentUser.id
                            }
                        ]
                    }
                    
                },
                include: {
                    user: true
                }
            });

            newConversation.user.forEach(async(user) => {
                if (user.email) {
                 await pusherServer.trigger(user.email, 'conversation:new', newConversation);
                };

            })

            return NextResponse.json(newConversation)
        };


        const existingConversations = await prisma.conversation.findMany({
        where:{
            OR:[
                {
                    userIds: {
                        equals:[currentUser.id,userId]
                    }
                },
                {
                    userIds: {
                        equals:[userId,currentUser.id]
                    }
                },
            ]
        }
        });


        const singelConversation = existingConversations[0];

        if (singelConversation) {
            return NextResponse.json(singelConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                user: {
                    connect: [
                        {
                           id:currentUser.id
                        },
                        {
                            id:userId
                        }
                   ]
               }
            },
            include: {
                user: true
            }
        });


        newConversation.user.map(async(user) => {
            if (user.email) {
              await  pusherServer.trigger(user.email, 'conversation:new', newConversation);
            }
        })
      

        return  NextResponse.json(newConversation);


    } catch (e: any) {
     return new   NextResponse('Internal Error',{status:500})
    }
};