import { Page } from "@playwright/test";

export async function mockResponse(page: Page, routePath: string, body: string) {
  await page.route(routePath, async (route) => {
    const response = await page.request.fetch(route.request());
    route.fulfill({
      response,
      body,
      headers: response.headers(),
    });
  });
}
