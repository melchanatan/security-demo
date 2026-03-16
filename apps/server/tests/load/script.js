import { check, sleep } from "k6";
import http from "k6/http";

// Read the base URL from environment variable, fallback to localhost:3000
const BASE_URL = "https://cms.marlai.me";

export const options = {
  // Define different testing stages (Ramp up, Maintain, Ramp down)
  stages: [
    { duration: "10s", target: 500 }, // Ramp up to 2 virtual users
    { duration: "30s", target: 500 }, // Hold at 2 users
    { duration: "10s", target: 0 }, // Ramp down
  ],
  thresholds: {
    // Fail the test if 95% of requests take longer than 200ms
    http_req_duration: ["p(95)<200"],
    // Fail if more than 1% of requests fail
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  // 1. Test the health check
  const healthRes = http.get(
    `${BASE_URL}/wp-json/wp/v2/users?type=author&per_page=8`
  );
  check(healthRes, {
    "get user per page is 200": (r) => r.status === 200,
  });

  // Optionally add RPC testing here depending on your actual routes (e.g., getting todos)
  /*
  const payload = JSON.stringify({ /* rpc payload * / });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const rpcRes = http.post(`${BASE_URL}/rpc/todos.list`, payload, params);
  check(rpcRes, { 'RPC successful': (r) => r.status === 200 });
  */

  // Sleep between iterations to simulate realistic user behavior
  sleep(1);
}
