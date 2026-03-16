import { expect, test } from "@playwright/test";
import { AuthPage } from "./pom/auth-page";
import { TodosPage } from "./pom/todos-page";

const DASHBOARD_URL_REGEX = /\/dashboard/;

test.describe("Todos", () => {
  let authPage: AuthPage;
  let todosPage: TodosPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    todosPage = new TodosPage(page);

    // Sign up a new user for each test to ensure isolation
    const email = `todo-user-${Date.now()}@example.com`;
    await authPage.goto();
    await authPage.switchToSignUp();
    await authPage.fillSignUpForm("Todo User", email, "password123");
    await authPage.submit();
    await expect(page).toHaveURL(DASHBOARD_URL_REGEX);

    await todosPage.goto();
  });

  test("should add a new todo", async () => {
    const todoText = `Todo-${Date.now()}`;
    await todosPage.addTodo(todoText);

    const todoItem = todosPage.getTodoItem(todoText);
    await expect(todoItem).toBeVisible();
  });

  test("should toggle a todo", async () => {
    const todoText = `Toggle-${Date.now()}`;
    await todosPage.addTodo(todoText);

    const todoItem = todosPage.getTodoItem(todoText);
    const checkbox = todoItem.getByRole("checkbox");

    await expect(checkbox).not.toBeChecked();
    await todosPage.toggleTodo(todoText);
    await expect(checkbox).toBeChecked();
  });

  test("should delete a todo", async () => {
    const todoText = `Delete-${Date.now()}`;
    await todosPage.addTodo(todoText);

    const todoItem = todosPage.getTodoItem(todoText);
    await expect(todoItem).toBeVisible();

    await todosPage.deleteTodo(todoText);
    await expect(todoItem).not.toBeVisible();
  });
});
