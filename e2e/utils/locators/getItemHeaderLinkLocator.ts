import { Locator } from "@playwright/test";

export function getItemHeaderLinkLocator(locator: Locator) {
  return locator.locator("[data-testid=item-header] > a");
}

export function getItemHeaderLinkLocatorNth(locator: Locator, nth: number) {
  return getItemHeaderLinkLocator(locator).nth(nth);
}