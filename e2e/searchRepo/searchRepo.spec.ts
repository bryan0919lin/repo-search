import { test, expect, Page } from "@playwright/test";
import {
  getRepoListLocator,
  getItemHeaderLinkLocator,
  getItemHeaderLinkLocatorNth,
} from "../utils/locators";
import { mockSearchRepo } from "../utils/mockApi";
import searchReposPage1 from "../../services/fakeResponses/searchRepos/searchReposPage1.json";

test.beforeEach(({ page }) => {
  mockSearchRepo(page, searchReposPage1);
});

test("should only render visible items", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const inputLocator = page.locator("input");
  inputLocator.fill("bryan test");
  inputLocator.press("Enter");

  const repoListLocator = getRepoListLocator(page);
  const itemHeaderLinkLocator = getItemHeaderLinkLocator(repoListLocator);

  await expect(getItemHeaderLinkLocatorNth(repoListLocator, 0)).toHaveText(
    "pDallastra/bryan"
  );

  const itemCount = await itemHeaderLinkLocator.count();
  expect(itemCount).toBe(6);
});
