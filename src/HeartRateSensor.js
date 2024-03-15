export class HeartRateSensor {
    
    characteristic;

    constructor() {
        this.connect = this.connect.bind(this) // why? https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback/20279485#20279485
    }

    handleHeartRateChanged(event) {
        const heartRate = event.target.value.getUint8(1);
        console.log('heart rate changed ' + this.currentHeartRate);        
        return heartRate;
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