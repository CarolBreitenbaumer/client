import {BigInteger} from "@angular/compiler/src/i18n/big_integer";

export class Tutor {

  constructor(
    public id: number,
    public image: string,
    public firstname: string,
    public lastname: string,
    public description: Text,
    public education: string,
    public tnumber: string,
    public pricePerHour: BigInteger,
    public priceForTenHours: BigInteger,
    public comment: string
  ) {
  }
}
