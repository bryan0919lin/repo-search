import { Page } from "@playwright/test";

export function getRepoListLocator(page: Page) {
  return page.locator("[data-testid=repo-list]");
}
