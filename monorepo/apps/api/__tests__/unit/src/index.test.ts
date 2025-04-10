import { expect, test } from "bun:test";

import { app } from "../../../src/hono";

test("GET /", async () => {
  const res = await app.request("/pageview");
  expect(res.status).toBe(200);
});

test("pageView cookie increments on each request", async () => {
  const res1 = await app.request("/pageview");
  expect(res1.status).toBe(200);

  const data1 = await res1.json();
  expect(data1.pageView).toBe("1");

  const cookies1 = res1.headers.get("set-cookie");
  expect(cookies1).toBeDefined();
  expect(cookies1).not.toBeNull();

  if (!cookies1) {
    throw new Error("cookies1 is null");
  }

  const res2 = await app.request("/pageview", {
    headers: {
      cookie: cookies1,
    },
  });
  expect(res2.status).toBe(200);

  const data2 = await res2.json();
  expect(data2.pageView).toBe("2");

  const cookies2 = res2.headers.get("set-cookie");
  expect(cookies2).toBeDefined();
  expect(cookies2).not.toBeNull();

  if (!cookies2) {
    throw new Error("cookies2 is null");
  }

  const res3 = await app.request("/pageview", {
    headers: {
      cookie: cookies2,
    },
  });
  expect(res3.status).toBe(200);

  const data3 = await res3.json();
  expect(data3.pageView).toBe("3");
});

test("pageView starts as undefined for new visitor", async () => {
  const res = await app.request("/pageview");
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.pageView).toBe("1");
});

test("pageView cookie does not increment when reusing same cookie", async () => {
  const res1 = await app.request("/pageview");
  const cookies = res1.headers.get("set-cookie");
  expect(cookies).toBeDefined();
  expect(cookies).not.toBeNull();

  if (!cookies) {
    throw new Error("cookies is null");
  }

  const res2 = await app.request("/pageview", {
    headers: {
      cookie: cookies,
    },
  });
  expect(res2.status).toBe(200);

  const data2 = await res2.json();
  expect(data2.pageView).toBe("2");

  // repeat the same cookie 5 times
  for (let i = 1; i <= 5; i++) {
    const res = await app.request("/pageview", {
      headers: {
        cookie: cookies,
      },
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.pageView).toBe("2");
  }
});
