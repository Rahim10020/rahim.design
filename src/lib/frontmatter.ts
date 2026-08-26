export interface ParsedFrontmatter {
  data: Record<string, unknown>;
  content: string;
}

function parseValue(value: string): unknown {
  const trimmed = value.trim();
  const unquote = (input: string) => input.replace(/^(["'])(.*)\1$/, "$2");
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const values = trimmed.slice(1, -1).match(/(?:[^,"']|"[^"]*"|'[^']*')+/g);
    return values?.map((item) => unquote(item.trim())).filter(Boolean) ?? [];
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return unquote(trimmed);
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const normalized = raw.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n"))
    return { data: {}, content: normalized };
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: normalized };
  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    if (key) data[key] = parseValue(line.slice(separator + 1));
  }
  return { data, content: normalized.slice(match[0].length) };
}
