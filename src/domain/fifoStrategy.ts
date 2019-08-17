import Commitment from "./commitment";
import Investment from "./investment";
import CommitmentDrawdown from "./commitmentDrawdown";

interface Map {
  [key: string]: number;
}

export default class FifoStrategy {
  static Key: string = "First In First Out (FIFO)";

  getCommitmentInvestmentMap(investments: Investment[]): Map {
    let result: Map = {};
    return investments.reduce((map, curr) => {
      let amount = map[`${curr.commitmentId}-${curr.fundId}`];
      if (amount === undefined) {
        amount = 0;
      }

      map[`${curr.commitmentId}-${curr.fundId}`] =
        amount + curr.investmentAmount;

      return map;
    }, result);
  }

  calculateUndrawnCommitmentBeforeNotice(
    commitment: Commitment,
    commitmentInvestments: any
  ): number {
    const invested =
      commitmentInvestments[`${commitment.id}-${commitment.fundId}`];
    if (invested !== undefined) {
      return commitment.amount - invested;
    }

    return commitment.amount;
  }

  calculateDrawdownAmounts(
    commitmentsToProcess: CommitmentDrawdown[],
    remainingCapitalRequirement: number
  ): CommitmentDrawdown[] {
    if (commitmentsToProcess && commitmentsToProcess.length === 0) return [];

    if (remainingCapitalRequirement === 0) return commitmentsToProcess;

    const [head, ...tail] = commitmentsToProcess;
    if (head.undrawnCommitmentBeforeNotice >= remainingCapitalRequirement) {
      tail.unshift(
        new CommitmentDrawdown(
          head.commitmentId,
          head.fundId,
          head.date,
          head.commitedAmount,
          head.undrawnCommitmentBeforeNotice,
          remainingCapitalRequirement,
          head.undrawnCommitmentBeforeNotice - remainingCapitalRequirement
        )
      );
      return tail;
    } else {
      const result = this.calculateDrawdownAmounts(
        tail,
        remainingCapitalRequirement - head.undrawnCommitmentBeforeNotice
      );
      result.unshift(
        new CommitmentDrawdown(
          head.commitmentId,
          head.fundId,
          head.date,
          head.commitedAmount,
          head.undrawnCommitmentBeforeNotice,
          head.undrawnCommitmentBeforeNotice,
          0
        )
      );
      return result;
    }
  }

  hasEnoughUndrawnCommitmentBeforeNotice(
    drawdowns: CommitmentDrawdown[],
    capitalRequirement: number
  ): boolean {
    return (
      drawdowns.reduce(
        (total, curr) => (total += curr.undrawnCommitmentBeforeNotice),
        0
      ) >= capitalRequirement
    );
  }

  apply(
    commitments: Commitment[],
    investments: Investment[],
    capitalRequirement: number
  ): CommitmentDrawdown[] {
    const commitmentInvestments = this.getCommitmentInvestmentMap(investments);
    const currentCommitments = commitments
      .sort((comm1, comm2) => comm1.date.getTime() - comm2.date.getTime())
      .map(commitment => {
        const undrawnCommitmentBeforeNotice = this.calculateUndrawnCommitmentBeforeNotice(
          commitment,
          commitmentInvestments
        );
        return new CommitmentDrawdown(
          commitment.id,
          commitment.fundId,
          commitment.date,
          commitment.amount,
          undrawnCommitmentBeforeNotice,
          0,
          undrawnCommitmentBeforeNotice
        );
      });

    if (
      this.hasEnoughUndrawnCommitmentBeforeNotice(
        currentCommitments,
        capitalRequirement
      ) === false
    ) {
      throw new Error("Not enough undrawn commitments to satisfy call");
    }

    return this.calculateDrawdownAmounts(
      currentCommitments,
      capitalRequirement
    );
  }
}
