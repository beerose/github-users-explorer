import { prefixWithHttps } from "./prefixWithHttps";

describe("prefixWithHttps", () => {
  it("leaves strings starting with http protocol untouched", () => {
    expect(prefixWithHttps("https://google.com")).toBe("https://google.com");
    expect(prefixWithHttps("http://google.com")).toBe("http://google.com");
  });

  it("prefixes strings missing http protocol prefix", () => {
    expect(prefixWithHttps("aleksandra.codes")).toBe(
      "https://aleksandra.codes"
    );
  });
});
