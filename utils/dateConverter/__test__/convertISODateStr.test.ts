import "@testing-library/jest-dom";
import convertISODateStr from "../convertISODateStr";

describe("convertISODateStr", () => {
  it("should convert to local date string with default setting", () => {
    const localDateStr = convertISODateStr("2022-05-31T10:29:01.226141");
    expect(localDateStr).toBe("Tue, May 31, 2022");
  });

  it("should convert to local date string with specified local", () => {
    const localDateStr = convertISODateStr(
      "2022-05-31T10:29:01.226141",
      "zh-TW"
    );
    expect(localDateStr).toBe("2022年5月31日 週二");
  });

  it("should convert to local date string with specified local and opts", () => {
    const localDateStr = convertISODateStr(
      "2022-05-31T10:29:01.226141",
      "zh-TW",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Vancouver",
        timeZoneName: "long",
      }
    );
    expect(localDateStr).toBe("2022年5月30日 星期一 太平洋夏令時間");
  });

  it("should return 'Invalid Date' with incorrect ISO date string", () => {
    const localDateStr = convertISODateStr("abcde");
    expect(localDateStr).toBe("Invalid Date");
  });
});
