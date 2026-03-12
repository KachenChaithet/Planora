import webpush from "web-push"

webpush.setVapidDetails(
    "mailto:test@test.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export const sendPush = async (sub: any, payload: any) => {

    const subscription = {
        endpoint: sub.endpoint,
        keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
        }
    }

    await webpush.sendNotification(
        subscription,
        JSON.stringify(payload)
    )
}