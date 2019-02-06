import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatDividerModule,
  MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DeviceComponent, DialogDeviceAdd } from './device/device.component';

import { MapService } from './map/map.service';
import { DeviceService } from './device/device.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      MapComponent,
      NavbarComponent,
      DeviceComponent,
      DialogDeviceAdd,
      LoginComponent
   ],
   entryComponents: [
      DialogDeviceAdd
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      BrowserAnimationsModule,
      LayoutModule,
      AgmCoreModule.forRoot({ apiKey: 'AIzaSyAzAfW-j6cK62M_3bQgBnYVnIEbN0TcCGc'}),
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatDividerModule,
      MatSelectModule,
      FlexLayoutModule
   ],
   providers: [
      MapService,
      DeviceService,
      { provide: FirestoreSettingsToken, useValue: {} }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
