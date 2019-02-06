import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DeviceComponent } from './device/device.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: DeviceComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'devices', component: DeviceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
