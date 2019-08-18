import React from "react";
import { mount } from "enzyme";
import { parseUkDate } from "../../utils/date";
import {
  mockGetFunds,
  mockGetCommitments,
  mockGetInvestments,
  mockGetCalls,
  mockPostInvestments,
  mockPostCall
} from "../../infrastructure/jsonApi";
import NewCall from "./NewCall";
import Fund from "../../domain/fund";
import Commitment from "../../domain/commitment";

let wrapper;
const select = selector => wrapper.find(selector).first();
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

jest.mock("../../infrastructure/jsonApi");

const funds = [new Fund(1, "Fund 1"), new Fund(2, "Fund 2")];
const commitments = [
  new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
  new Commitment(2, 2, parseUkDate("31/01/2018"), 10000000)
];
const calls = [];
const investments = [];

describe("New Call ", () => {
  beforeEach(() => {
    mockGetFunds.mockClear();
    mockGetCommitments.mockClear();
    mockGetInvestments.mockClear();
    mockGetCalls.mockClear();
    mockPostInvestments.mockClear();
    mockPostCall.mockClear();

    mockGetFunds.mockResolvedValue(funds);
    mockGetCommitments.mockResolvedValue(commitments);
    mockGetInvestments.mockResolvedValue(investments);
    mockGetCalls.mockResolvedValue(calls);
  });

  it("calls jsonApi to load data on mount", async () => {
    wrapper = await mount(<NewCall />);
    wrapper.update();

    expect(mockGetFunds).toHaveBeenCalledTimes(1);
    expect(mockGetCommitments).toHaveBeenCalledTimes(1);
    expect(mockGetInvestments).toHaveBeenCalledTimes(1);
    expect(mockGetCalls).toHaveBeenCalledTimes(1);
  });

  it("calls jsonApi to save call and investments", async () => {
    mockPostCall.mockResolvedValue({});
    mockPostInvestments.mockResolvedValue({});

    const mockHistory = { push: jest.fn() };

    wrapper = await mount(<NewCall history={mockHistory} />);
    wrapper.update();

    select(`[data-test="amount"]`).simulate("change", {
      target: { value: "15000000" }
    });

    select(`[data-test="calculate-button"]`).simulate("click");
    select(`[data-test="confirm-button"]`).simulate("submit");

    await flushPromises();

    expect(mockPostCall).toHaveBeenCalledTimes(1);
    expect(mockPostInvestments).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toHaveBeenCalledTimes(1);
  });
});
