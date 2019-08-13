import React from "react";
import { mount } from "enzyme";
import { parseUkDate } from "../utils/date";
import CommitmentDrawdown from "../domain/commitmentDrawdown";
import NewCallForm from "./NewCallForm";
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

const mockSave = jest.fn();
const mockCalculate = jest.fn();

describe("New Call Form ", () => {
  it("pressing calculate button shows drawdowns", () => {
    wrapper = mount(
      <NewCallForm
        calculate={mockCalculate}
        save={mockSave}
        commitmentDrawdowns={commitmentDrawdowns}
      />
    );

    expect(select(NewCallDrawdowns).exists()).toBe(false);

    select(`[data-test="calculate-button"]`)
      .first()
      .simulate("click");

    expect(select(NewCallDrawdowns).exists()).toBe(true);
  });

  it("pressing calculate button shows confirm button", () => {
    wrapper = mount(
      <NewCallForm
        calculate={mockCalculate}
        save={mockSave}
        commitmentDrawdowns={commitmentDrawdowns}
      />
    );

    expect(select(`[data-test="confirm-button"]`).exists()).toBe(false);

    select(`[data-test="calculate-button"]`)
      .first()
      .simulate("click");

    expect(select(`[data-test="confirm-button"]`).exists()).toBe(true);
  });

  it("calls calculate when button clicked", () => {
    mockCalculate.mockClear();

    wrapper = mount(
      <NewCallForm
        calculate={mockCalculate}
        save={mockSave}
        commitmentDrawdowns={commitmentDrawdowns}
      />
    );

    expect(mockCalculate.mock.calls.length).toBe(0);

    select(`[data-test="calculate-button"]`)
      .first()
      .simulate("click");

    expect(mockCalculate.mock.calls.length).toBe(1);
  });

  it("calls save when form is submitted", () => {
    mockSave.mockClear();

    wrapper = mount(
      <NewCallForm
        calculate={mockCalculate}
        save={mockSave}
        commitmentDrawdowns={commitmentDrawdowns}
      />
    );

    expect(mockSave.mock.calls.length).toBe(0);

    select(`[data-test="calculate-button"]`)
      .first()
      .simulate("click");

    expect(mockSave.mock.calls.length).toBe(0);

    select(`[data-test="confirm-button"]`)
      .first()
      .simulate("submit");

    expect(mockSave.mock.calls.length).toBe(1);
  });
});
