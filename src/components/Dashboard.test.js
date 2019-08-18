import React from "react";
import { mount } from "enzyme";
import { parseUkDate } from "../utils/date";
import {
  mockGetFunds,
  mockGetCommitments,
  mockGetInvestments,
  mockGetCalls
} from "../infrastructure/jsonApi";
import Fund from "../domain/fund";
import Commitment from "../domain/commitment";
import Call from "../domain/call";
import Investment from "../domain/investment";
import Dashboard from "./Dashboard";

let wrapper;
const select = selector => wrapper.find(selector).first();
const elementSelect = (element, selector) => element.find(selector).first();

jest.mock("../infrastructure/jsonApi");

const funds = [new Fund(1, "Fund 1"), new Fund(2, "Fund 2")];
const commitments = [
  new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
  new Commitment(2, 2, parseUkDate("31/01/2018"), 10000000)
];
const calls = [
  new Call(1, 1, parseUkDate("31/01/2018"), "Investment 1", 5000000),
  new Call(2, 2, parseUkDate("01/04/2018"), "Investment 2", 10000000)
];
const investments = [
  new Investment(1, 1, 1, 1, 5000000),
  new Investment(2, 2, 1, 1, 5000000),
  new Investment(2, 2, 2, 2, 5000000)
];

describe("Dashboard ", () => {
  beforeEach(() => {
    mockGetFunds.mockClear();
    mockGetCommitments.mockClear();
    mockGetInvestments.mockClear();
    mockGetCalls.mockClear();

    mockGetFunds.mockResolvedValue(funds);
    mockGetCommitments.mockResolvedValue(commitments);
    mockGetInvestments.mockResolvedValue(investments);
    mockGetCalls.mockResolvedValue(calls);
  });

  it("calls the correct api methods", async () => {
    wrapper = await mount(<Dashboard />);
    wrapper.update();

    expect(mockGetFunds).toHaveBeenCalledTimes(1);
    expect(mockGetCommitments).toHaveBeenCalledTimes(0);
    expect(mockGetInvestments).toHaveBeenCalledTimes(1);
    expect(mockGetCalls).toHaveBeenCalledTimes(1);
  });

  it("shows all fund columns", async () => {
    wrapper = await mount(<Dashboard />);
    wrapper.update();

    const firstFund = select(`[data-test="fund-1"]`);
    expect(firstFund.exists()).toBe(true);
    expect(firstFund.text()).toBe("Fund 1");

    const secondFund = select(`[data-test="fund-2"]`);
    expect(secondFund.exists()).toBe(true);
    expect(secondFund.text()).toBe("Fund 2");

    expect(select(`[data-test="fund-3"]`).exists()).toBe(false);
  });

  it("show correct calls and values", async () => {
    wrapper = await mount(<Dashboard />);
    wrapper.update();

    const firstCall = select(`[data-test="call-1"]`);
    expect(firstCall.exists()).toBe(true);
    expect(elementSelect(firstCall, `[data-test="date"]`).text()).toBe(
      "31/01/2018"
    );
    expect(elementSelect(firstCall, `[data-test="call"]`).text()).toBe("1");
    expect(elementSelect(firstCall, `[data-test="fund-1"]`).text()).toBe(
      "5,000,000"
    );
    expect(elementSelect(firstCall, `[data-test="fund-2"]`).text()).toBe("-");

    const secondCall = select(`[data-test="call-2"]`);
    expect(secondCall.exists()).toBe(true);
    expect(elementSelect(secondCall, `[data-test="date"]`).text()).toBe(
      "01/04/2018"
    );
    expect(elementSelect(secondCall, `[data-test="call"]`).text()).toBe("2");
    expect(elementSelect(secondCall, `[data-test="fund-1"]`).text()).toBe(
      "5,000,000"
    );
    expect(elementSelect(secondCall, `[data-test="fund-2"]`).text()).toBe(
      "5,000,000"
    );
  });
});
