import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

function sendUserCount(): void{
    const totalUsers = wss.clients.size;
    wss.clients.forEach((client)=>{
        if (client.readyState === WebSocket.OPEN){

            client.send(JSON.stringify({totalUsers}));
        }
    })
}

wss.on("connection", (ws)=>{
    ws.on("error", console.error);
    console.log("A User Connected");

    sendUserCount();

    ws.on("close", ()=>{
        console.log("A User Disconnected");
        sendUserCount();
    });

    ws.on("message", (data)=>{
        const message = data.toString();
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        });

    })
});

