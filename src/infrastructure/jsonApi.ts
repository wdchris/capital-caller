import Commitment from "../domain/commitment";
import Investment from "../domain/investment";
import { parseUkDate } from "../utils/date";
import Fund from "../domain/fund";
import Call from "../domain/call";

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

  postInvestment = async (investment: Investment): Promise<Investment> => {
    const url = "http://localhost:8080/investments";
    return await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        call_id: investment.callId,
        commitment_id: investment.commitmentId,
        fund_id: investment.fundId,
        investment_amount: investment.investmentAmount
      })
    })
      .then(response => response.json())
      .then(
        data =>
          new Investment(
            data.id,
            data.call_id,
            data.commitment_id,
            data.fund_id,
            data.investment_amount
          )
      );
  };

  postInvestments = async (
    investments: Investment[]
  ): Promise<Investment[]> => {
    const results = [];
    for (const investment of investments) {
      results.push(await this.postInvestment(investment));
    }

    return results;
  };

  getCalls = async (): Promise<Call[]> => {
    const url = "http://localhost:8080/calls";
    return await fetch(url)
      .then(response => response.json())
      .then(data =>
        data.map(
          (d: any) =>
            new Call(
              d.id,
              d.call_id,
              d.date,
              d.investment_name,
              d.capital_requirement
            )
        )
      );
  };

  postCall = async (call: Call): Promise<Call> => {
    const url = "http://localhost:8080/calls";
    return await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        call_id: call.callId,
        date: call.date,
        investment_name: call.investmentName,
        capital_requirement: call.capitalRequirement
      })
    })
      .then(response => response.json())
      .then(
        data =>
          new Call(
            data.id,
            data.call_id,
            data.date,
            data.investment_name,
            data.capital_requirement
          )
      );
  };
}
