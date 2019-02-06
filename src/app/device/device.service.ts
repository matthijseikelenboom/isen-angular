import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDevice } from './device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private db: AngularFirestore) {}

  getDevices(): Observable<any> {
    return this.db
      .collection<IDevice>('devices', ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as IDevice;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getDeviceByVanId(vanId: string): Observable<IDevice[]> {
    return this.db
      .collection<IDevice>('devices', ref =>
        ref.where('lastConnectedMarker', '==', vanId)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as IDevice;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  createDevice(device: IDevice) {
    return this.db.collection<IDevice>('devices').add(device);
  }

  updateDevice(device: IDevice) {
    return this.db
      .collection<IDevice>('devices')
      .doc(device.id)
      .set(device, { merge: true });
  }

  removeDevice(id: string) {
    return this.db
      .collection<IDevice>('devices')
      .doc(id)
      .delete();
  }
}
