import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    const body = await req.json()

    const session = await auth.api.getSession({
        headers: req.headers
    })

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existing = await prisma.pushSubscription.findUnique({
        where: {
            endpoint: body.endpoint
        }
    })

    if (!existing) {
        await prisma.pushSubscription.create({
            data: {
                userId: session.user.id,
                endpoint: body.endpoint,
                p256dh: body.keys.p256dh,
                auth: body.keys.auth
            }
        })
    }
    await prisma.pushSubscription.create({
        data: {
            userId: session?.user.id,
            endpoint: body.endpoint,
            p256dh: body.keys.p256dh,
            auth: body.keys.auth
        }
    })

    return NextResponse.json({ success: true })
}