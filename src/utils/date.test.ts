import { parseUkDate } from "./date";

describe("date utils ", () => {
  it("returns a correct UK date", () => {
    var result = parseUkDate("27/01/2019");

    expect(result).toMatchObject(new Date(2019, 0, 27));
  });
});
