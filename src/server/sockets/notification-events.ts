import { Server, Socket } from "socket.io";

export const registerNotificationEvents = (io: Server, socket: Socket) => {
    socket.on("join-user", (userId: string) => {
        socket.join(`user:${userId}`)
    })

    socket.on("notification:new", ({ userId, notification }) => {

        io.to(`user:${userId}`).emit("notification:new", notification)

    })
    socket.on("leave-user", (userId: string) => {
        socket.leave(`user:${userId}`)
    })
}