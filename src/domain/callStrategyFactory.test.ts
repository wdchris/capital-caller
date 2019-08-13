import CallStrategyFactory from "./callStrategyFactory";
import FifoStrategy from "./fifoStrategy";

describe("Call Stratgy Factory ", () => {
  it("returns FIFO when named", () => {
    const result = new CallStrategyFactory().getStrategy(FifoStrategy.Key);

    expect(result).toBeInstanceOf(FifoStrategy);
  });

  it("throws an error if not found", () => {
    function getInvalidStrategy() {
      new CallStrategyFactory().getStrategy("I'm not a strategy!");
    }

    expect(getInvalidStrategy).toThrow();
  });
});
