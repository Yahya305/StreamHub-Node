import { Server } from "http"
import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

class RoomHandler{
    socket;
    io;
    constructor(io:any,socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>){
        this.socket=socket
        this.io=io
    }

    createRoom(){
        try {
            console.log("Create room req received")
        } catch (error) {
            console.log("Some error occured...\n",error)
        }
    }

}
export default RoomHandler