
import { Server } from "socket.io";
import  express from "express" ;
import { createServer } from "http";
import {  fileURLToPath } from "url";
import { dirname ,join} from "path";



const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.urlencoded({ 
    extended : false, 
    limit : 10000 ,

}))


app.get('/', function(req,res){
    res.sendFile(__dirname + '/app.html')
})
app.post('/' , function(req,res){
    console.log(req.body)
})


io.on('connection',(socket) => {

     console.log('User ${socket.id} connected')

     socket.on('u2s' , data => {
          console.log("messaggio ricevuto")
          console.log(data)
         

     })
     socket.on("u2u", data => {
        socket.broadcast.emit("u2u" , data )
     })
     
})

server.listen(2000);