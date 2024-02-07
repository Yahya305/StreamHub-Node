import "./App.css";
import { useState, useRef } from "react";
// import { socket } from "./configs/socket";
import { io } from 'socket.io-client';

function App() {
    const [isSwitchedOn, toggleCamera] = useState(false);
    const cameraRef = useRef();
    const handleButtonClick = async () => {
        try {
            const constraints = {
                audio: { echoCancellation: true },
                video: {
                    deviceId: 0,
                    width: { min: 200 },
                    height: { min: 100 },
                },
            };
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );
            toggleCamera(true);
            cameraRef.current.srcObject = stream;
            console.log("Got MediaStream:", stream);
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    };
    async function makeCall() {
        try {
          const socket= io()
          console.log(socket)
          // socket.on("connect",()=>{console.log("Connected")})
            // const configuration = {
            //     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            // };
            // const peerConnection = new RTCPeerConnection(configuration);
            // signalingChannel.addEventListener("message", async (message) => {
            //     if (message.answer) {
            //         const remoteDesc = new RTCSessionDescription(
            //             message.answer
            //         );
            //         await peerConnection.setRemoteDescription(remoteDesc);
            //     }
            // });
            // const offer = await peerConnection.createOffer();
            // await peerConnection.setLocalDescription(offer);
            // signalingChannel.send({ offer: offer });
        } catch (error) {
          console.log("Unable to make a call")
        }
    }
    return (
        <div className="App">
            <h1>Lobby Page</h1>
            <button onClick={handleButtonClick}>Open Camera</button>
            {/* {isSwitchedOn && (
              )} */}
            <video
                ref={cameraRef}
                id="localVideo"
                autoPlay
                playsInline
                controls={false}
            />
            <button onClick={makeCall}>Join Room</button>
        </div>
    );
}

export default App;
