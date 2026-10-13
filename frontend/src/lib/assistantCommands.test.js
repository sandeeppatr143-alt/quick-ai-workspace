import test from "node:test";
import assert from "node:assert/strict";
import { parseAssistantCommand } from "./assistantCommands.js";

test("routes natural-language prompts to the intended tools", () => {
  assert.equal(parseAssistantCommand("Please write an article about AI").route, "/ai/write-article");
  assert.equal(parseAssistantCommand("Generate an image of a bridge").route, "/ai/generate-images");
  assert.equal(parseAssistantCommand("Remove the background from my image").route, "/ai/remove-background");
  assert.equal(parseAssistantCommand("Review my resume").route, "/ai/review-resume");
  assert.equal(parseAssistantCommand("remove the background from this photo").route, "/ai/remove-background");
  assert.equal(parseAssistantCommand("can you check my CV?").route, "/ai/review-resume");
  assert.equal(parseAssistantCommand("make a picture of a robot").route, "/ai/generate-images");
});

test("returns null for empty or unsupported commands", () => {
  assert.equal(parseAssistantCommand("   "), null);
  assert.equal(parseAssistantCommand("play music"), null);
});
