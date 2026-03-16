import prisma from "@security-demo/db";
import { app } from "../src/index";

beforeAll(async () => {
  // Clear the table before we start
  await prisma.todo.deleteMany({});

  // Seed with standard data
  await prisma.todo.createMany({
    data: [
      { text: "Buy milk", completed: false },
      { text: "Do laundry", completed: true },
    ],
  });
});

afterAll(async () => {
  // Teardown
  await prisma.todo.deleteMany({});
  await prisma.$disconnect();

  if (app?.server && typeof app?.stop === "function") {
    await app.stop();
  }
});

describe("Todo API Integration Tests (Real Database)", () => {
  it("should get all todos", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/rpc/todo/getAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: {} }),
      })
    );

    expect(response.status).toBe(200);
    const text = await response.text();
    const body: any = JSON.parse(text);

    expect(body.json).toBeDefined();
    expect(body.json.length).toBeGreaterThanOrEqual(2);

    const texts = body.json.map((t: any) => t.text);
    expect(texts).toContain("Buy milk");
    expect(texts).toContain("Do laundry");
  });

  it("should create a new todo", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/rpc/todo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // send superjson format
        body: JSON.stringify({ json: { text: "New task via test" } }),
      })
    );

    expect(response.status).toBe(200);
    const text = await response.text();
    const body: any = JSON.parse(text);

    expect(body.json).toBeDefined();
    expect(body.json.id).toBeDefined();
    expect(body.json.text).toBe("New task via test");
    expect(body.json.completed).toBe(false);

    // Verify it's in the actual db
    const inDb = await prisma.todo.findUnique({
      where: { id: body.json.id },
    });
    expect(inDb).toBeDefined();
    expect(inDb?.text).toBe("New task via test");
  });

  it("should yield 400 for invalid create input", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/rpc/todo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: { unknownField: "bad" } }),
      })
    );

    expect(response.status).toBe(400);
  });
});
