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

// eslint-disable-next-line no-unused-vars
let wrapper;
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

    mockGetFunds.mockResolvedValue(new Promise(() => funds));
    mockGetCommitments.mockResolvedValue(new Promise(() => commitments));
    mockGetInvestments.mockResolvedValue(new Promise(() => calls));
    mockGetCalls.mockResolvedValue(new Promise(() => investments));
  });

  it("calls jsonApi to load data on mount", async () => {
    wrapper = mount(<NewCall />);

    await flushPromises();

    expect(mockGetFunds).toHaveBeenCalledTimes(1);
    expect(mockGetCommitments).toHaveBeenCalledTimes(1);
    expect(mockGetInvestments).toHaveBeenCalledTimes(1);
    expect(mockGetCalls).toHaveBeenCalledTimes(1);
  });
});
