import { expect, test } from "@playwright/test";
import { AuthPage } from "./pom/auth-page";
import { UserMenuPage } from "./pom/user-menu-page";

const DASHBOARD_URL_REGEX = /\/dashboard/;
const HOME_URL_REGEX = /\/$/;

test.describe("Authentication", () => {
  let authPage: AuthPage;
  const randomEmail = `test-${Date.now()}@example.com`;
  const password = "password123";
  const name = "Test User";

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test("should sign up successfully", async ({ page }) => {
    await authPage.switchToSignUp();
    await authPage.fillSignUpForm(name, randomEmail, password);
    await authPage.submit();

    await expect(page).toHaveURL(DASHBOARD_URL_REGEX);
    // Toast might be elusive, so we check it with a slightly longer timeout or just rely on navigation
  });

  test("should sign in successfully", async ({ page }) => {
    const signInEmail = `signin-${Date.now()}@example.com`;
    const userMenu = new UserMenuPage(page, name);

    await authPage.switchToSignUp();
    await authPage.fillSignUpForm(name, signInEmail, password);
    await authPage.submit();
    await expect(page).toHaveURL(DASHBOARD_URL_REGEX);

    await userMenu.signOut();
    await expect(page).toHaveURL(HOME_URL_REGEX);

    await authPage.goto();
    await authPage.switchToSignIn();
    await authPage.fillSignInForm(signInEmail, password);
    await authPage.submit();

    await expect(page).toHaveURL(DASHBOARD_URL_REGEX);
  });
});
