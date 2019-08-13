import Commitment from "./commitment";
import Investment from "./investment";
import CommitmentDrawdown from "./commitmentDrawdown";

export default class FifoStrategy {
  static Key: string = "First In First Out (FIFO)";

  calculateUndrawnCommitmentBeforeNotice(
    commitment: Commitment,
    investments: Investment[]
  ): number {
    return investments.reduce((acc, curr) => {
      if (
        curr.commitmentId === commitment.id &&
        curr.fundId === commitment.fundId
      ) {
        return acc - curr.investmentAmount;
      }
      return acc;
    }, commitment.amount);
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

  apply(
    commitments: Commitment[],
    investments: Investment[],
    capitalRequirement: number
  ): CommitmentDrawdown[] {
    const currentCommitments = commitments
      .sort((comm1, comm2) => comm1.date.getTime() - comm2.date.getTime())
      .map(commitment => {
        const undrawnCommitmentBeforeNotice = this.calculateUndrawnCommitmentBeforeNotice(
          commitment,
          investments
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

    return this.calculateDrawdownAmounts(
      currentCommitments,
      capitalRequirement
    );
  }
}
