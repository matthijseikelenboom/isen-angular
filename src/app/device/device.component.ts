import { Component, OnInit, AfterViewInit, Inject, ViewChild } from '@angular/core';

import { DeviceService } from './device.service';
import { IDevice } from './device';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as firebase from 'firebase';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, AfterViewInit {

  displayedColumns = ['select', 'beaconCode', 'name', 'description', 'type', 'status', 'date', 'markerId'];
  dataSource = new MatTableDataSource<IDevice>();
  selection = new SelectionModel<IDevice>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.deviceService.getDevices().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogDeviceAdd, {
      width: '300px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.lastConnectedDate = firebase.firestore.FieldValue.serverTimestamp();
        result.lastConnectedMarker = '';
        this.deviceService.createDevice(result);
      }
    });
  }

  onDelete() {
    this.selection.selected.forEach(device => {
      this.deviceService.removeDevice(device.id);
    });
    this.selection.clear();
  }

}

@Component({
  selector: 'app-dialog-device-add',
  templateUrl: 'device.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class DialogDeviceAdd {

  statusOptions = ['Goed', 'Gemiddeld', 'Stuk'];

  constructor(
    public dialogRef: MatDialogRef<DialogDeviceAdd>,
    @Inject(MAT_DIALOG_DATA) public data: IDevice
  ) { }

  onCancel() {
    this.dialogRef.close();
  }

}
