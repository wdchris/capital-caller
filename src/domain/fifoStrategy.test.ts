import moment from "moment";
import FifoStrategy from "./fifoStrategy";
import Commitment from "./commitment";
import Investment from "./investment";

const parseUkDate = (ukDateString: string) =>
  moment(ukDateString, "DD/MM/YYYY HH:mm").toDate();

describe("FIFO Strategy", () => {
  it("returns all commitments", () => {
    const strategy = new FifoStrategy();

    const commitments = [
      new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
      new Commitment(2, 2, parseUkDate("31/03/2018"), 15000000)
    ];

    const investments = [new Investment(1, 1, 1, 1, 9500000)];

    const capitalRequirement = 10000000;

    const expectedResult = [
      {
        commitmentId: 1,
        fundId: 1,
        date: expect.any(Date),
        commitedAmount: 10000000
      },
      {
        commitmentId: 2,
        fundId: 2,
        date: expect.any(Date),
        commitedAmount: 15000000
      }
    ];

    var result = strategy.apply(commitments, investments, capitalRequirement);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject(expectedResult[0]);
    expect(result[1]).toMatchObject(expectedResult[1]);
  });

  it("sorts commitments by date descending", () => {
    const strategy = new FifoStrategy();

    const commitments = [
      new Commitment(2, 2, parseUkDate("31/03/2018"), 15000000),
      new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
      new Commitment(3, 3, parseUkDate("30/06/2018"), 10000000)
    ];

    const investments = [new Investment(1, 1, 1, 1, 9500000)];

    const capitalRequirement = 10000000;

    const expectedResult = [
      {
        commitmentId: 1
      },
      {
        commitmentId: 2
      },
      {
        commitmentId: 3
      }
    ];

    var result = strategy.apply(commitments, investments, capitalRequirement);

    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject(expectedResult[0]);
    expect(result[1]).toMatchObject(expectedResult[1]);
    expect(result[2]).toMatchObject(expectedResult[2]);
  });

  it("calculates undrawn commitment before notice", () => {
    const strategy = new FifoStrategy();

    const commitments = [
      new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
      new Commitment(2, 2, parseUkDate("31/03/2018"), 15000000)
    ];

    const investments = [new Investment(1, 1, 1, 1, 9500000)];

    const capitalRequirement = 10000000;

    const expectedResult = [
      {
        commitmentId: 1,
        undrawnCommitmentBeforeNotice: 500000
      },
      {
        commitmentId: 2,
        undrawnCommitmentBeforeNotice: 15000000
      }
    ];

    var result = strategy.apply(commitments, investments, capitalRequirement);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject(expectedResult[0]);
    expect(result[1]).toMatchObject(expectedResult[1]);
  });

  it("calculates drawdown notice", () => {
    const strategy = new FifoStrategy();

    const commitments = [
      new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
      new Commitment(2, 2, parseUkDate("31/03/2018"), 15000000),
      new Commitment(3, 3, parseUkDate("30/06/2018"), 10000000)
    ];

    const investments = [new Investment(1, 1, 1, 1, 9500000)];

    const capitalRequirement = 10000000;

    const expectedResult = [
      {
        commitmentId: 1,
        drawdownNotice: 500000,
        undrawnCommitmentAfterNotice: 0
      },
      {
        commitmentId: 2,
        drawdownNotice: 9500000,
        undrawnCommitmentAfterNotice: 5500000
      },
      {
        commitmentId: 3,
        drawdownNotice: 0,
        undrawnCommitmentAfterNotice: 10000000
      }
    ];

    var result = strategy.apply(commitments, investments, capitalRequirement);

    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject(expectedResult[0]);
    expect(result[1]).toMatchObject(expectedResult[1]);
    expect(result[2]).toMatchObject(expectedResult[2]);
  });

  it("calculates drawdown notice across multiple fund commitment", () => {
    const strategy = new FifoStrategy();

    const commitments = [
      new Commitment(1, 1, parseUkDate("31/12/2017"), 10000000),
      new Commitment(2, 2, parseUkDate("31/03/2018"), 10000000),
      new Commitment(3, 1, parseUkDate("30/06/2018"), 10000000)
    ];

    const capitalRequirement = 25000000;

    const expectedResult = [
      {
        commitmentId: 1,
        drawdownNotice: 10000000,
        undrawnCommitmentAfterNotice: 0
      },
      {
        commitmentId: 2,
        drawdownNotice: 10000000,
        undrawnCommitmentAfterNotice: 0
      },
      {
        commitmentId: 3,
        drawdownNotice: 5000000,
        undrawnCommitmentAfterNotice: 5000000
      }
    ];

    var result = strategy.apply(commitments, [], capitalRequirement);

    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject(expectedResult[0]);
    expect(result[1]).toMatchObject(expectedResult[1]);
    expect(result[2]).toMatchObject(expectedResult[2]);
  });
});
