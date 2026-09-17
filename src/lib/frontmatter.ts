export interface ParsedFrontmatter {
  data: Record<string, unknown>;
  content: string;
}

function stripComment(value: string): string {
  let quote: '"' | "'" | undefined;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if ((character === '"' || character === "'") && value[index - 1] !== "\\") {
      quote = quote === character ? undefined : (quote ?? character);
    }
    if (
      character === "#" &&
      !quote &&
      (index === 0 || /\s/.test(value[index - 1]))
    ) {
      return value.slice(0, index).trimEnd();
    }
  }

  return value;
}

function splitArray(value: string): string[] {
  const items: string[] = [];
  let start = 0;
  let quote: '"' | "'" | undefined;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if ((character === '"' || character === "'") && value[index - 1] !== "\\") {
      quote = quote === character ? undefined : (quote ?? character);
    }
    if (character === "," && !quote) {
      items.push(value.slice(start, index).trim());
      start = index + 1;
    }
  }

  if (quote) throw new Error("unterminated quoted string in array");
  items.push(value.slice(start).trim());
  return items.filter(Boolean);
}

function unquote(input: string): string {
  if (input.length < 2) return input;
  const first = input[0];
  const last = input[input.length - 1];
  if (first !== last || (first !== '"' && first !== "'")) return input;
  return first === '"'
    ? JSON.parse(input)
    : input.slice(1, -1).replace(/''/g, "'");
}

function parseValue(value: string): unknown {
  const trimmed = stripComment(value).trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return splitArray(trimmed.slice(1, -1)).map(unquote);
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  return unquote(trimmed);
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const normalized = raw.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n"))
    return { data: {}, content: normalized };
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match)
    throw new Error("Invalid frontmatter: missing closing --- delimiter");
  const data: Record<string, unknown> = {};
  for (const [lineIndex, line] of match[1].split(/\r?\n/).entries()) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator === -1) {
      throw new Error(
        `Invalid frontmatter at line ${lineIndex + 2}: expected key: value`,
      );
    }
    const key = line.slice(0, separator).trim();
    if (!key)
      throw new Error(
        `Invalid frontmatter at line ${lineIndex + 2}: empty key`,
      );
    if (key in data)
      throw new Error(
        `Invalid frontmatter at line ${lineIndex + 2}: duplicate key "${key}"`,
      );
    data[key] = parseValue(line.slice(separator + 1));
  }
  return { data, content: normalized.slice(match[0].length) };
}
