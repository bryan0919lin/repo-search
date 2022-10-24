import { Page } from "@playwright/test";
import { mockResponse } from "./mockResponse";

export async function mockSearchRepo(page: Page, body: Record<string, unknown>) {
  mockResponse(page, "https://api.github.com/search/repositories**", JSON.stringify(body));
}
