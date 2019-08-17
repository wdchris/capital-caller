import React from "react";
import { mount } from "enzyme";
import { parseUkDate } from "../../utils/date";
import CommitmentDrawdown from "../../domain/commitmentDrawdown";
import Drawdowns from "./Drawdowns";
import Fund from "../../domain/fund";

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

const funds = [new Fund(1, "Fund 1"), new Fund(2, "Fund 2")];

describe("New Call Drawdowns ", () => {
  it("displays all drawdowns passed in", () => {
    wrapper = mount(
      <Drawdowns commitmentDrawdowns={commitmentDrawdowns} funds={funds} />
    );

    expect(select(`[data-test="commitment-drawdown-1"]`).exists()).toBe(true);
    expect(select(`[data-test="commitment-drawdown-2"]`).exists()).toBe(true);
  });

  it("displays no drawdowns if none passed in", () => {
    wrapper = mount(<Drawdowns commitmentDrawdowns={[]} funds={funds} />);

    expect(select(`[data-test="commitment-drawdown-1"]`).exists()).toBe(false);
  });

  it("displays correct drawdown information", () => {
    wrapper = mount(
      <Drawdowns commitmentDrawdowns={commitmentDrawdowns} funds={funds} />
    );

    expect(select(`[data-test="commitment-drawdown-1"]`).exists()).toBe(true);
    expect(
      select(`[data-test="commitment-drawdown-1-commitment-id"]`).text()
    ).toBe("1");
    expect(select(`[data-test="commitment-drawdown-1-fund-id"]`).text()).toBe(
      "1"
    );
    expect(select(`[data-test="commitment-drawdown-1-date"]`).text()).toBe(
      "31/12/2017"
    );
    expect(select(`[data-test="commitment-drawdown-1-fund"]`).text()).toBe(
      "Fund 1"
    );
    expect(
      select(`[data-test="commitment-drawdown-1-commited-amounts"]`).text()
    ).toBe("10,000,000");
    expect(
      select(
        `[data-test="commitment-drawdown-1-undrawn-commitment-before-notice"]`
      ).text()
    ).toBe("500,000");
    expect(
      select(`[data-test="commitment-drawdown-1-drawdown-notice"]`).text()
    ).toBe("500,000");
    expect(
      select(
        `[data-test="commitment-drawdown-1-undrawn-commitment-after-notice"]`
      ).text()
    ).toBe("0");
  });
});
