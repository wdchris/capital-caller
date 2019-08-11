export default class CommitmentDrawdown {
  readonly commitmentId: number;
  readonly fundId: number;
  readonly date: Date;
  readonly commitedAmount: number;
  readonly undrawnCommitmentBeforeNotice: number;
  readonly drawdownNotice: number;
  readonly undrawnCommitmentAfterNotice: number;

  constructor(
    commitmentId: number,
    fundId: number,
    date: Date,
    commitedAmount: number,
    undrawnCommitmentBeforeNotice: number,
    drawdownNotice: number,
    undrawnCommitmentAfterNotice: number
  ) {
    this.commitmentId = commitmentId;
    this.fundId = fundId;
    this.date = date;
    this.commitedAmount = commitedAmount;
    this.undrawnCommitmentBeforeNotice = undrawnCommitmentBeforeNotice;
    this.drawdownNotice = drawdownNotice;
    this.undrawnCommitmentAfterNotice = undrawnCommitmentAfterNotice;
  }
}
