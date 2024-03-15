export class HeartRateSensor {
    
    characteristic;
    currentHeartRate;
    onHeartRateChanged;
    constructor(onHeartRateChanged) {
        this.connect = this.connect.bind(this)
        this.onHeartRateChanged = onHeartRateChanged;
    }

    handleHeartRateChanged(event) {
        const heartRate = event.target.value.getUint8(1);
        console.log('heart rate changed ' + heartRate);
        if(this.currentHeartRate !== heartRate) {
            this.currentHeartRate = heartRate;
            if(this.onHeartRateChanged) {
                this.onHeartRateChanged(heartRate);
            }
        }                        
    }

    connect() {
        return navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
        .then(device => { return device.gatt.connect() })
        .then(connection => { return connection.getPrimaryService('heart_rate')})
        .then(server => { return server.getCharacteristic('heart_rate_measurement')})
        .then(charac => {
            this.characteristic = charac;             
            console.log(this.characteristic);
            return this.startNotifications2();             
        })
        .catch(error => { console.error(error); });
    }

    startNotificatons(characteristic) {        
        return characteristic.startNotifications().then(_ => {
            console.log("starting characteristic notifications");
            characteristic.addEventListener('characteristicvaluechanged', this.handleHeartRateChanged.bind(this));        
        }).catch(e => console.log(e));
    }

    startNotifications2() {
        return this.startNotificatons(this.characteristic);
    }

    stopNotifications() {
        return this.characteristic.stopNotifications();
    }

}