import type { Locator, Page } from "@playwright/test";

const SIGN_UP_REGEX = /sign up/i;
const SIGN_IN_REGEX = /sign in/i;

export class AuthPage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nameInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole("button", { name: SIGN_UP_REGEX });
    this.signInLink = page.getByRole("button", { name: SIGN_IN_REGEX });
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.nameInput = page.locator('input[name="name"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto("/login");
  }

  async switchToSignUp() {
    await this.signUpLink.click();
  }

  async switchToSignIn() {
    await this.signInLink.click();
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

  async submit() {
    await this.submitButton.click();
  }
}
