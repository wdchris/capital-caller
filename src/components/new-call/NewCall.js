import React from "react";
import Form from "./Form";
import JsonApi from "../../infrastructure/jsonApi";
import CallStrategyFactory from "../../infrastructure/callStrategyFactory";

class NewCall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commitments: [],
      investments: [],
      funds: [],
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

  save = (date, rules, name, amount) => {
    //todo: save results
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
