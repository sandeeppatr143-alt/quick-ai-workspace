const COMMANDS = [
  { route: "/ai/write-article", phrases: ["write an article", "write article", "draft article", "article writer", "write a post", "create an article"] },
  { route: "/ai/blog-titles", phrases: ["blog title", "blog titles", "headline ideas", "title generator", "generate titles"] },
  { route: "/ai/generate-images", phrases: ["generate an image", "generate image", "create an image", "create image", "image generation", "make a picture", "text to image"] },
  { route: "/ai/remove-background", phrases: ["remove the background", "remove background", "background remover", "cut out background"] },
  { route: "/ai/remove-object", phrases: ["remove object", "erase object", "object remover", "remove an object"] },
  { route: "/ai/review-resume", phrases: ["review my resume", "review resume", "resume review", "cv feedback", "check my cv", "improve resume"] },
  { route: "/ai/community", phrases: ["community", "published creations", "public gallery"] },
  { route: "/ai", phrases: ["dashboard", "home", "workspace", "all tools", "show tools"] },
];

/** Deterministic intent routing for natural-language workspace commands. */
export function parseAssistantCommand(input) {
  const normalized = String(input ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) return null;

  const match = COMMANDS
    .flatMap((command) => command.phrases.map((phrase) => ({ ...command, phrase })))
    .filter(({ phrase }) => normalized.includes(phrase))
    .sort((a, b) => b.phrase.length - a.phrase.length)[0];

  return match ? { route: match.route, intent: match.phrase } : null;
}

export const assistantCommandExamples = [
  "Write an article about edge AI",
  "Generate an image",
  "Remove background",
  "Review my resume",
];
