import type { Locator, Page } from "@playwright/test";

const TODO_INPUT_REGEX = /add a new task/i;
const ADD_BUTTON_REGEX = /add/i;
const DELETE_TODO_REGEX = /delete todo/i;

export class TodosPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly addButton: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder(TODO_INPUT_REGEX);
    this.addButton = page.getByRole("button", { name: ADD_BUTTON_REGEX });
    this.todoList = page.getByRole("list");
    this.todoItems = page.getByRole("listitem");
  }

  async goto() {
    await this.page.goto("/todos");
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.addButton.click();
  }

  async toggleTodo(text: string) {
    const todoItem = this.todoItems.filter({ hasText: text });
    await todoItem.getByRole("checkbox").click();
  }

  async deleteTodo(text: string) {
    const todoItem = this.todoItems.filter({ hasText: text });
    await todoItem.getByLabel(DELETE_TODO_REGEX).click();
  }

  getTodoItem(text: string) {
    return this.todoItems.filter({ hasText: text });
  }
}
