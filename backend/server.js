const connect = require("./connect")
const express = require("express")
const cors = require('cors')
const http = require("http");
const users = require('./userRoutes')
const boards = require('./boardRoutes')
const chats = require('./chatRoutes')
const messages = require('./messageRoutes')
const { initializeSocket } = require("./socket");

const app = express();
const PORT = 3000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(users) // mounts to userRoutes
app.use(boards)
app.use(chats)
app.use(messages)

initializeSocket(server);

server.listen(PORT, () => {
    connect.connectToServer();
    console.log(`server connected to port ${PORT}`)
});
