import Commitment from "./commitment";
import Investment from "./investment";
import CommitmentDrawdown from "./commitmentDrawdown";

export default interface CallStrategy {
  apply(
    commitments: Commitment[],
    investments: Investment[],
    capitalRequirement: number
  ): CommitmentDrawdown[];
}
