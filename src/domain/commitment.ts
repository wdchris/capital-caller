export default class Commitment {
  readonly id: number;
  readonly fundId: number;
  readonly date: Date;
  readonly amount: number;

  constructor(id: number, fundId: number, date: Date, amount: number) {
    this.id = id;
    this.fundId = fundId;
    this.date = date;
    this.amount = amount;
  }
}
