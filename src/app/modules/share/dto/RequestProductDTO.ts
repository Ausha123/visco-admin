export class RequestProductDTO {
  constructor(
    public productName: string,
    public displayName: string,
    public serial: string,
    public productType: string,
    public unitType: string,
    public brand: string,
    public extraState: string,
    public availableUnit: number,
    public hourlyCost: number,
    public extraNote: string,
    public productGuideline: string,
    public image: string
  ) {
  }
}
