import React from "react";
import { useSensorManager } from "./SensorManagerContext";

function HeartRateComponent() {
    const sensorManager = useSensorManager();
    const handleConnectSensor = () => {
        debugger;
        if(sensorManager.heartRateSensorConnect) {
            sensorManager.heartRateSensorConnect();
        }
    }
    return(
        <div id="heartRate">
            <p>This is the heart rate component</p>
            <button onClick={handleConnectSensor}>Find sensors</button>
            <p>Heart rate changes...{sensorManager.heartRate || "Not connected"}</p>
        </div>
    )
}
export default HeartRateComponent;