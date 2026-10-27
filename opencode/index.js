// Lumora plugin for OpenCode.
// Adds Lumora's hosted MCP server (https://lumora.video/mcp, OAuth sign-in) and the
// `lumora` skill from ../lumora-plugin, so OpenCode, Claude Code and Codex share one skill.
// One module serves both plugin APIs: OpenCode 2 calls setup(), OpenCode 1 calls server().
import { readFileSync } from "node:fs"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const MCP_NAME = "lumora"
const MCP_URL = "https://lumora.video/mcp"
const SKILL_FILE = fileURLToPath(new URL("../lumora-plugin/skills/lumora/SKILL.md", import.meta.url))
const SKILLS_DIR = dirname(dirname(SKILL_FILE))

// The shared skill tells Claude Code users to sign in with /mcp; add the OpenCode way.
const OPENCODE_SIGN_IN = "In OpenCode, ask the user to run `opencode mcp auth lumora` in a terminal."

function readSkill() {
  const raw = readFileSync(SKILL_FILE, "utf8")
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw)
  const meta = {}
  for (const line of (match?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":")
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  const content = raw
    .slice(match?.[0].length ?? 0)
    .trimStart()
    .replace("\n## Workflow", `\n${OPENCODE_SIGN_IN}\n\n## Workflow`)
  return { name: meta.name ?? "lumora", description: meta.description, content }
}

export default {
  id: "lumora",

  // OpenCode 2 (@opencode/plugin)
  async setup(ctx) {
    const skill = readSkill()
    await ctx.mcp.transform((mcp) => {
      if (!mcp.get(MCP_NAME)) mcp.set(MCP_NAME, { type: "remote", url: MCP_URL })
    })
    await ctx.skill.transform((skills) => {
      if (skills.get(skill.name)) return
      skills.add({
        id: skill.name,
        name: skill.name,
        description: skill.description,
        path: SKILL_FILE,
        content: skill.content,
      })
    })
  },

  // OpenCode 1 (@opencode-ai/plugin)
  async server() {
    return {
      async config(config) {
        config.mcp ??= {}
        config.mcp[MCP_NAME] ??= { type: "remote", url: MCP_URL }
        config.skills ??= {}
        config.skills.paths = [...(config.skills.paths ?? []), SKILLS_DIR]
      },
    }
  },
}
