import Commitment from "../domain/commitment";
import Investment from "../domain/investment";
import { parseUkDate } from "../utils/date";
import Fund from "../domain/fund";

export default class JsonApi {
  getFunds = async (): Promise<Fund[]> => {
    const url = "http://localhost:8080/funds";
    return await fetch(url)
      .then(response => response.json())
      .then(data => data.map((d: any) => new Fund(d.id, d.name)));
  };

  getCommitments = async (): Promise<Commitment[]> => {
    const url = "http://localhost:8080/commitments";
    return await fetch(url)
      .then(response => response.json())
      .then(data =>
        data.map(
          (d: any) =>
            new Commitment(d.id, d.fund_id, parseUkDate(d.date), d.amount)
        )
      );
  };

  getInvestments = async (): Promise<Investment[]> => {
    const url = "http://localhost:8080/investments";
    return await fetch(url)
      .then(response => response.json())
      .then(data =>
        data.map(
          (d: any) =>
            new Investment(
              d.id,
              d.call_id,
              d.commitment_id,
              d.fund_id,
              d.investment_amount
            )
        )
      );
  };
}
