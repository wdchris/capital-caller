export default class Call {
  readonly id: number;
  readonly callId: number;
  readonly date: Date;
  readonly investmentName: string;
  readonly capitalRequirement: number;

  constructor(
    id: number,
    callId: number,
    date: Date,
    investmentName: string,
    capitalRequirement: number
  ) {
    this.id = id;
    this.callId = callId;
    this.date = date;
    this.investmentName = investmentName;
    this.capitalRequirement = capitalRequirement;
  }
}
