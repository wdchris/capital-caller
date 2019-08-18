import React from "react";
import { formatUkDate } from "../utils/date";
import JsonApi from "../infrastructure/jsonApi";

const mapKey = (callId, fundId) => `${callId}-${fundId}`;
const getCommitmentInvestmentMap = investments => {
  let result = {};
  return investments.reduce((map, curr) => {
    let amount = map[mapKey(curr.callId, curr.fundId)];
    if (amount === undefined) {
      amount = 0;
    }

    map[mapKey(curr.callId, curr.fundId)] = amount + curr.investmentAmount;

    return map;
  }, result);
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      investments: [],
      funds: [],
      calls: []
    };
  }

  componentDidMount() {
    const api = new JsonApi();
    api
      .getInvestments()
      .then(investments => this.setState({ investments: investments }));
    api.getFunds().then(funds => this.setState({ funds: funds }));
    api.getCalls().then(calls => this.setState({ calls: calls }));
  }

  render() {
    const investmentMap = getCommitmentInvestmentMap(this.state.investments);
    const getInvestment = (callId, fundId) => {
      let amount = investmentMap[mapKey(callId, fundId)];
      if (amount === undefined || amount === 0) {
        return "-";
      }

      return amount.toLocaleString();
    };
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Call #</th>
            {this.state.funds.map(fund => (
              <th data-test={`fund-${fund.id}`} key={fund.id}>
                {fund.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.calls.map(call => (
            <tr data-test={`call-${call.id}`} key={call.id}>
              <td data-test="date">{formatUkDate(call.date)}</td>
              <td data-test="call">{call.callId}</td>
              {this.state.funds.map(fund => (
                <td
                  data-test={`fund-${fund.id}`}
                  key={mapKey(call.id, fund.id)}
                >
                  {getInvestment(call.id, fund.id)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Dashboard;
