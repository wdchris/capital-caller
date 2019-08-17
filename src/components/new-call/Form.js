import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import FifoStrategy from "../../domain/fifoStrategy";
import Drawdowns from "./Drawdowns";
import FormItem from "./FormItem";

const FormWrapper = styled.ul`
  list-style-type: none;
  min-width: 800px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #395d73;
  color: #ffffff;
  font-size: large;
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
  padding: 10px;
`;

const Form = ({ calculate, save, commitmentDrawdowns, funds }) => {
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [rules, setRules] = useState(FifoStrategy.Key);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [showDrawdowns, setShowDrawdowns] = useState(false);

  const onCalculate = event => {
    event.preventDefault();
    calculate(rules, amount);
    setShowDrawdowns(true);
  };

  const onSubmit = event => {
    event.preventDefault();
    save(date, name, amount);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormWrapper>
          <FormItem
            name="date"
            label="Date"
            value={date}
            readonly={true}
            onChange={e => setDate(e.target.value)}
          />
          <FormItem
            name="rules"
            label="Rules"
            value={rules}
            readonly={true}
            onChange={e => setRules(e.target.value)}
          />
          <FormItem
            name="name"
            label="Investment Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <FormItem
            name="amount"
            label="Capital Required for Investment"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </FormWrapper>
        <ButtonWrapper>
          <Button data-test="calculate-button" onClick={onCalculate}>
            Calculate
          </Button>
        </ButtonWrapper>
        {showDrawdowns && (
          <React.Fragment>
            <Drawdowns
              commitmentDrawdowns={commitmentDrawdowns}
              funds={funds}
            />
            <ButtonWrapper>
              <Button data-test="confirm-button">Confirm</Button>
            </ButtonWrapper>
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default Form;
