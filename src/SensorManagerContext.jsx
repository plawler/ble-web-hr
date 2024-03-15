import React, { useContext, useRef, useState } from "react";
import { HeartRateSensor } from "./HeartRateSensor";

const SensorManagerContext = React.createContext(undefined);

function SensorManagerProvider({children}) {
    const [heartRate, setHeartRate] = useState(undefined);
    const heartRateSensor = useRef(new HeartRateSensor(setHeartRate));

    const contextValue = {        
        heartRate,
        heartRateSensorConnect: heartRateSensor.current?.connect
    };

    return (
        <SensorManagerContext.Provider value={contextValue}>
            {children}
        </SensorManagerContext.Provider>
    )
}

function useSensorManager() {
    const context = useContext(SensorManagerContext);
    if(context === undefined) throw new Error("SensorManager not instantiated");
    return context;
}

export {SensorManagerProvider, useSensorManager};