export interface IDevice {
  id?: string;
  beaconCode: number;
  name: string;
  description: string;
  type: string;
  status: string;
  lastConnectedDate: Date;
  lastConnectedMarker: string;
}
