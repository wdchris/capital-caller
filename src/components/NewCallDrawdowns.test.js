import React from "react";
import { mount } from "enzyme";
import { parseUkDate } from "../utils/date";
import CommitmentDrawdown from "../domain/commitmentDrawdown";
import NewCallDrawdowns from "./NewCallDrawdowns";

let wrapper;
const select = selector => wrapper.find(selector).first();

const commitmentDrawdowns = [
  new CommitmentDrawdown(
    1,
    1,
    parseUkDate("31/12/2017"),
    10000000,
    500000,
    500000,
    0
  ),
  new CommitmentDrawdown(
    2,
    2,
    parseUkDate("31/03/2018"),
    15000000,
    15000000,
    9500000,
    5500000
  )
];

describe("New Call Drawdowns ", () => {
  it("displays all drawdowns passed in", () => {
    wrapper = mount(
      <NewCallDrawdowns commitmentDrawdowns={commitmentDrawdowns} />
    );

    expect(select(`[data-test="commitment-drawdown-1"]`).exists()).toBe(true);
    expect(select(`[data-test="commitment-drawdown-2"]`).exists()).toBe(true);
  });

  it("displays no drawdowns if none passed in", () => {
    wrapper = mount(<NewCallDrawdowns commitmentDrawdowns={[]} />);

    expect(select(`[data-test="commitment-drawdown-1"]`).exists()).toBe(false);
  });
});
