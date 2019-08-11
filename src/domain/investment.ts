export default class Investment {
  readonly id: number;
  readonly callId: number;
  readonly commitmentId: number;
  readonly fundId: number;
  readonly investmentAmount: number;

  constructor(
    id: number,
    callId: number,
    commitmentId: number,
    fundId: number,
    invesmentAmount: number
  ) {
    this.id = id;
    this.callId = callId;
    this.commitmentId = commitmentId;
    this.fundId = fundId;
    this.investmentAmount = invesmentAmount;
  }
}
