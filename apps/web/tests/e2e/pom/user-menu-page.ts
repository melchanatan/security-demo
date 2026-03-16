import type { Locator, Page } from "@playwright/test";

const TEST_USER_REGEX = /Test User/i;
const SIGN_OUT_REGEX = /sign out/i;

export class UserMenuPage {
  readonly page: Page;
  readonly trigger: Locator;
  readonly signOutItem: Locator;

  constructor(page: Page, userName: string | RegExp = TEST_USER_REGEX) {
    this.page = page;
    this.trigger = page.getByRole("button", { name: userName });
    this.signOutItem = page.getByRole("menuitem", { name: SIGN_OUT_REGEX });
  }

  async open() {
    await this.trigger.waitFor({ state: "visible", timeout: 10_000 });
    await this.trigger.click();
  }

  async signOut() {
    await this.open();
    await this.signOutItem.click();
  }
}
