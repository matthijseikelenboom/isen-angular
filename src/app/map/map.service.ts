import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';

import { Marker, VilocTagResult, VilocTag } from './map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore, private httpClient: HttpClient) { }

  getVilocTags(): Observable<VilocTag[]> {
    return this.httpClient
      .get<VilocTagResult>('https://api.viloc.eu/V2/Assets', {
        headers: new HttpHeaders().set(
          'X-VilocToken',
          environment.vilocKey
        )
      })
      .pipe(
        map(data => {
          return data.objects.map(element => {
            const tag: VilocTag = {
              code: element.Code,
              category: element.Category,
              brand: element.Brand,
              model: element.Model,
              description: element.Description,
              geometry: {
                type: element.Location.type,
                coordinates: {
                  lat: element.Location.coordinates[1],
                  lng: element.Location.coordinates[0]
                }
              },
              lastReceived: element.LastReceived,
              status: element.Status
            };
            return tag;
          });
        })
      );
  }

  getMarkers(): Observable<Marker[]> {
    return this.db
      .collection<Marker>('markers')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Marker;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  createMarker(geoJson: Marker) {
    return this.db.collection<Marker>('markers').add(geoJson);
  }

  removeMarker(id: string) {
    return this.db
      .collection<Marker>('markers')
      .doc(id)
      .delete();
  }
}
