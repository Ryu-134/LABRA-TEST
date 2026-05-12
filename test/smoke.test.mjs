import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("index.html includes deployment success marker", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /Deployment Successful/);
});
