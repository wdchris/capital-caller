import { parseUkDate, formatUkDate } from "./date";

describe("date utils ", () => {
  it("parses a correct UK date", () => {
    var result = parseUkDate("27/01/2019");

    expect(result).toMatchObject(new Date(2019, 0, 27));
  });

  it("formats a correct UK date", () => {
    var result = formatUkDate(new Date(2019, 0, 27));

    expect(result).toEqual("27/01/2019");
  });
});
