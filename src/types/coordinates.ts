export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IGetDistanceBetweenCoordinates {
  from: ICoordinates;
  to: ICoordinates;
}
