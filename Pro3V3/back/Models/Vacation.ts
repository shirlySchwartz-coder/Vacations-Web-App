export class Vacation {
  public vacationId: number;
  public destination: string;
  public vacInfo: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public pictureUrl: string;

  constructor(
    vacationId: number,
    destination: string,
    vacInfo: string,
    startDate: Date,
    endDate: Date,
    price: number,
    pictureUrl: string
  ) {
    this.vacationId = vacationId;
    this.destination = destination;
    this.vacInfo = vacInfo;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.pictureUrl = pictureUrl;
  }
}
