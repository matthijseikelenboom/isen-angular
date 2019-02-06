import { Component, OnInit } from '@angular/core';
import { Marker, VilocTag } from './map';
import { MapService } from './map.service';
import { Observable } from 'rxjs';
import { DeviceService } from '../device/device.service';
import { GoogleMap, InfoWindow } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  protected map: GoogleMap;
  mapLat = 52.160114;
  mapLng = 4.49701;

  markers: Observable<Marker[]>;
  vilocTags: Observable<VilocTag[]>;
  busLabel = 'B';
  vilocLabel = 'V';

  infoWindowContent = '';
  previousWindow;

  constructor(private mapService: MapService, private deviceService: DeviceService) { }

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    this.vilocTags = this.mapService.getVilocTags();
  }

  mapReady(map: GoogleMap) {
    this.map = map;
  }

  onMarkerClick(infoWindow: InfoWindow, id: string) {
    this.deviceService.getDeviceByVanId(id).subscribe(result => {
      this.infoWindowContent = `<strong>Apparaten in ${id}:</strong><br><p>`;
      result.forEach(device => this.infoWindowContent += `Naam: ${device.name} - type: ${device.type}<br>`);
      this.infoWindowContent += `</p>`;
    });
    if (this.previousWindow) {
      this.previousWindow.close();
    }
    this.previousWindow = infoWindow;
  }

  onVilocMarkerClick(infoWindow: InfoWindow, tag: VilocTag) {
    this.infoWindowContent =
      `<strong>ViLoc Tag - Code/Naam: ${tag.code}</strong><br>
      <p>Omschrijving: ${tag.description}<br></p>
      <p>status: ${tag.status}<br>
      Laatst ontvangen: ${new Date(tag.lastReceived).toLocaleString()}`;
    if (this.previousWindow) {
      this.previousWindow.close();
    }
    this.previousWindow = infoWindow;
  }

  onDeviceButtonClick(infoWindow: InfoWindow, marker: Marker | VilocTag) {
    if (this.map) {
      this.map.panTo({ lat: marker.geometry.coordinates.lat, lng: marker.geometry.coordinates.lng });
      this.map.setZoom(14);
      if (infoWindow) {
        infoWindow.open();
      } else {
        console.log('Hmmm');
      }
    }
  }

}
