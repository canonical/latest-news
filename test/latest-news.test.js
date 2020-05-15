import {
  fetchLatestNews,
  revealSection,
  formatDate,
  getTemplate,
  latestArticlesCallback,
  articleDiv,
} from "../src/index";

describe("revealSection", () => {
  it("removes `u-hide` class from latest news section", () => {
    document.body.innerHTML =
      "<div class='u-hide' data-js='latest-news'></div>";

    revealSection();

    expect(
      document
        .querySelector("[data-js='latest-news']")
        .classList.contains("u-hide")
    ).toBe(false);
  });
});

describe("formatDate", () => {
  it("formats a date string", () => {
    expect(formatDate("2020-05-12T14:36:06")).toEqual("12 May 2020");
  });
});

describe("getTemplate", () => {
  it("returns a document fragment", () => {
    document.body.innerHTML = `
      <template id="example">
        <h2>Lorem ipsum</h2>
      </template>
    `;

    expect(getTemplate("#example")).toEqual(
      document.querySelector("#example").content
    );
  });
});

describe("latestArticlesCallback", () => {
  it("is defined", () => {
    expect(latestArticlesCallback).toBeDefined();
  });
});

describe("articleDiv", () => {
  it("is defined", () => {
    expect(articleDiv).toBeDefined();
  });
});

describe("fetchLatestNews", () => {
  it("is defined", () => {
    expect(fetchLatestNews).toBeDefined();
  });
});
