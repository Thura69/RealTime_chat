import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prisma.db';
import { NextResponse } from 'next/server';


export async function POST(
    request: Request,
    
) {
    try {
        const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
        return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            hashedPassword: hashedPassword
        }
    });

    return NextResponse.json(user);
    } catch (error:any) {
        console.log(error, "REGISTRATION ERROR"); 
        return new NextResponse('Internal Error',{status:500})
  }
};