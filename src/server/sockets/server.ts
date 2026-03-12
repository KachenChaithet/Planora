import { createServer } from "http"
import { Server } from "socket.io"
import { registerTaskEvents } from "./task-events"
import { registerNotificationEvents } from "./notification-events"

const httpServer = createServer()

const io = new Server(httpServer, {
    cors: { origin: "*" }
})


io.on("connection", (socket) => {
    registerNotificationEvents(io, socket)
    registerTaskEvents(io, socket)
})

httpServer.listen(4000, () => {
    console.log("Socket server running on 4000")
})