const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const db = require("./config/db")
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const staticRoutes = require('./routes/staticRoutes');
const socketHandler = require('./sockets/socket');
const cookieParser = require('cookie-parser');

const app = express()
const server = http.createServer(app)
const io = new Server(server)


//Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//static routes
 app.use('/',staticRoutes);

//API routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

//Socket.io
socketHandler(io);

app.use(express.static(path.join(__dirname, 'public')));


const PORT =  process.env.PORT || 3131; 
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})