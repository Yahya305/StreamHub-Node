import "./App.css";
import { useState,useRef } from "react";

function App() {
    const [isSwitchedOn, toggleCamera] = useState(false);
    const cameraRef=useRef()
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
            cameraRef.current.srcObject=stream
            console.log("Got MediaStream:", stream);
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    };
    return (
        <div className="App">
            <h1>Lobby Page</h1>
            <button onClick={handleButtonClick}>Open Camera</button>
            {/* {isSwitchedOn && (
              )} */}
              <video ref={cameraRef} id="localVideo" autoPlay playsInline controls={false} />
        </div>
    );
}

export default App;
