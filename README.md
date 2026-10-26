# Lumora plugins

Plugins that let Claude, Claude Code and Codex make cinematic product demo videos with [Lumora](https://lumora.video): a screen recording, screenshot or website in, a short trailer with camera moves, callouts, captions and music out.

The plugin lives in [`lumora-plugin/`](lumora-plugin/). It connects to Lumora's hosted MCP server (`https://lumora.video/mcp`, sign in with your Lumora account) and adds a skill that directs the video. See its [README](lumora-plugin/README.md) for the tools and what data goes where.

## Install

**Claude Code**

```
/plugin install lumora --marketplace synthentica/lumora-plugins
```

Then run `/mcp`, pick `lumora` and choose **Authenticate**.

**Codex**

```
codex plugin marketplace add synthentica/lumora-plugins
codex plugin add lumora@lumora
```

**Claude, ChatGPT and other MCP clients:** add a custom connector with the address `https://lumora.video/mcp` and sign in when asked.

## Links

[Docs for agents](https://lumora.video/docs/agents) · [Support](https://lumora.video/support) · [Privacy](https://lumora.video/privacy) · [Terms](https://lumora.video/terms)

MIT licensed.
