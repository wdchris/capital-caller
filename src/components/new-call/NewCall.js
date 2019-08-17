import React from "react";
import Form from "./Form";
import JsonApi from "../../infrastructure/jsonApi";
import CallStrategyFactory from "../../infrastructure/callStrategyFactory";
import Call from "../../domain/call";
import Investment from "../../domain/investment";

class NewCall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commitments: [],
      investments: [],
      funds: [],
      calls: [],
      commitmentDrawdowns: []
    };

    this.save = this.save.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    const api = new JsonApi();
    api
      .getCommitments()
      .then(commitments => this.setState({ commitments: commitments }));
    api
      .getInvestments()
      .then(investments => this.setState({ investments: investments }));
    api.getFunds().then(funds => this.setState({ funds: funds }));
    api.getCalls().then(calls => this.setState({ calls: calls }));
  }

  calculate = (rules, amount) => {
    const strategy = new CallStrategyFactory().getStrategy(rules);
    const commitmentDrawdowns = strategy.apply(
      this.state.commitments,
      this.state.investments,
      amount
    );

    this.setState({ commitmentDrawdowns: commitmentDrawdowns });
  };

  save = async (date, name, amount) => {
    const api = new JsonApi();

    const callId = Math.max(...this.state.calls.map(call => call.id)) + 1;
    await api.postCall(new Call(callId, callId, date, name, amount));

    let investmentId =
      Math.max(...this.state.investments.map(investment => investment.id)) + 1;
    const investments = this.state.commitmentDrawdowns.reduce(
      (arr, drawdown) => {
        if (drawdown.drawdownNotice > 0) {
          arr.push(
            new Investment(
              investmentId++,
              callId,
              drawdown.commitmentId,
              drawdown.fundId,
              drawdown.drawdownNotice
            )
          );
        }
        return arr;
      },
      []
    );

    await api.postInvestments(investments);
    this.props.history.push("/capitalcall/");
  };

  render() {
    return (
      <Form
        calculate={this.calculate}
        save={this.save}
        funds={this.state.funds}
        commitmentDrawdowns={this.state.commitmentDrawdowns}
      />
    );
  }
}

export default NewCall;
