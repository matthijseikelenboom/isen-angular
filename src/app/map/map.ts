export interface Geometry {
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Marker {
  type: string;
  geometry: Geometry;
  properties?: object;
  id?: string;
}

export interface VilocTag {
  code: string;
  category: string;
  brand: string;
  model: string;
  description: string;
  geometry: Geometry;
  lastReceived: string;
  status: string;
}

export interface VilocTagResult {
  objects: [
    {
      Code: string;
      Category: string;
      Brand: string;
      Model: string;
      VilocCode: string;
      Description: string;
      Comment: string;
      Location: {
        type: string;
        coordinates: number[];
      };
      LocationDateTime: string;
      LocationAccuracy: string;
      LastReceived: string;
      RecievedBy: {
        Type: -1;
        Code: string;
        Category: string;
        Responsible: string;
      };
      ReceivedOn: string;
      Status: string;
      DispatchedTo: string;
    }
  ];
}
