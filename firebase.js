import {database} from './firebase_init';
import {ref, set, onValue, push, onDisconnect, remove} from 'firebase/database';
export class Firebase {
    roomId = null;
    constructor(roomId) {
        if(roomId) {
            this.roomId = roomId;
            this.roomRef = ref(database, `rooms/${roomId}`);
        }else{
            const roomsRef = ref(database, 'rooms');
            this.roomRef = push(roomsRef, {map: Array(27).fill(0)})
            this.roomId = this.roomRef.key;
        }
        this.mapRef = ref(database, `rooms/${this.roomId}/map`);
        onDisconnect(this.roomRef).remove();
    //  add to url roomId

    }
    setMap(map) {
        set(this.mapRef, map);
    }
    mapListener(callback) {
        onValue(this.mapRef, (snapshot) => {
            callback(snapshot.val());
        });
    }
}
