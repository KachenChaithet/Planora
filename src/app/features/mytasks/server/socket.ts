import { createServer } from "http";
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', (socket) => {
    socket.on('join-task', (taskId: string) => {
        socket.join(taskId)
    })

    socket.on('leave-task', (taskId: string) => {
        socket.leave(taskId)
    })

    socket.on("send-comment", (data) => {
        io.to(data.taskId).emit("new-comment", data)

    })
})

httpServer.listen(4000, () => {
    console.log('Socket server running on port 4000');

})