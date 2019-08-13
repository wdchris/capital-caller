import CallStrategy from "./callStrategy";
import FifoStrategy from "../domain/fifoStrategy";

export default class CallStrategyFactory {
  getStrategy(name: string): CallStrategy {
    switch (name) {
      case FifoStrategy.Key:
        return new FifoStrategy();
      default:
        throw new Error(`no call strategy found for ${name}`);
    }
  }
}
