import type { Locator, Page } from "@playwright/test";

const SIGN_UP_LINK_REGEX = /need an account/i;
const SIGN_IN_LINK_REGEX = /already have an account/i;

export class AuthPage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole("button", { name: SIGN_UP_LINK_REGEX });
    this.signInLink = page.getByRole("button", { name: SIGN_IN_LINK_REGEX });
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.nameInput = page.getByLabel("Name");
  }

  get signUpSubmitButton() {
    return this.page
      .locator("form")
      .getByRole("button", { name: "Sign Up", exact: true });
  }

  get signInSubmitButton() {
    return this.page
      .locator("form")
      .getByRole("button", { name: "Sign In", exact: true });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async switchToSignUp() {
    if (await this.signUpLink.isVisible()) {
      await this.signUpLink.click();
    }
  }

  async switchToSignIn() {
    if (await this.signInLink.isVisible()) {
      await this.signInLink.click();
    }
  }

  async fillSignUpForm(name: string, email: string, pass: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
  }

  async fillSignInForm(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
  }

  async submitSignUp() {
    await this.signUpSubmitButton.click();
  }

  async submitSignIn() {
    await this.signInSubmitButton.click();
  }
}
