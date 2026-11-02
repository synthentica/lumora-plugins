# Lumora for OpenCode

Make cinematic product demo videos from OpenCode. Point it at a screen recording, screenshots or a public website, and it builds a short video with 3D camera moves, callouts, captions, a title card and music. It previews frames before you export, then gives you an MP4, GIF or WebM with a share link.

The plugin works with OpenCode 2 and OpenCode 1.x. It adds two things:

- **MCP server `lumora`**: Lumora's hosted server at `https://lumora.video/mcp` (remote, OAuth sign-in). Nothing runs on your computer.
- **Skill `lumora`**: tells the agent how to direct a good demo, which look fits which product, how to write callouts, and to check preview frames before exporting.

If you already have an MCP server named `lumora` in your config, the plugin leaves it as it is.

## Install

OpenCode 2:

```bash
opencode plugin add opencode-lumora
```

Or straight from GitHub: `opencode plugin add github:synthentica/lumora-plugins`.

The plugin goes into your global config (`~/.config/opencode/opencode.json`). To use it in one project only, add it to that project's `opencode.json` instead:

```json
{ "plugins": ["opencode-lumora"] }
```

OpenCode 1.x: add it to `opencode.json` and restart OpenCode.

```json
{ "$schema": "https://opencode.ai/config.json", "plugin": ["opencode-lumora"] }
```

## Sign in

```bash
opencode mcp auth lumora
```

A Lumora page opens in your browser. Sign in or create a free account and choose **Allow**. A free account includes three exports a month (720p, watermark); [Pro and Team](https://lumora.video/#pricing) remove the limit.

## Use

Ask for a video in plain words, for example:

> Make a 15 second launch video of our dashboard from `screenshots/dashboard.png`, Blockbuster style, with callouts on the chart and the export button.

> Turn `demo.mov` into a vertical 9:16 clip for Reels with captions.

> Make a demo video of https://example.com.

The agent uploads your files, creates the video, shows you preview frames and exports when you are happy. Files on your computer are uploaded through a one-time link, so the agent needs a shell (OpenCode's built-in one is fine).

## Tools

| Tool | What it does |
|---|---|
| `list_styles` | Looks, camera moves, palettes, effects, formats, templates and brand kits |
| `upload_media` | Upload a recording, screenshot, logo or music from a public URL or as base64 |
| `get_upload_link` | One-time link for uploading a file from your computer |
| `create_video`, `update_video` | Create or change a video project |
| `get_video`, `list_videos` | Read your video projects |
| `preview_frame` | Render one frame as an image |
| `render_video`, `render_status` | Export MP4, GIF or WebM with a share link, and follow its progress |
| `save_brand_kit` | Save your team's logo, colours, music and call to action (Team plan) |

## Check it works

OpenCode 2: `opencode plugin list` shows `lumora`, and `opencode mcp auth lumora` opens the sign-in page. OpenCode 1.x: `opencode mcp list` shows `lumora`, and `opencode debug skill` lists the `lumora` skill.

If the tools say they need authentication, run `opencode mcp auth lumora` again.

## Update and remove

OpenCode 2: `opencode plugin update` and `opencode plugin remove opencode-lumora`. OpenCode 1.x: change or remove the `plugin` entry in `opencode.json`. Removing the plugin does not delete your Lumora account; do that at [lumora.video](https://lumora.video).

## Data and privacy

Tool calls go only to `https://lumora.video`, signed in as your Lumora account. Lumora gets what the agent puts in a tool call (the video spec, your uploads, website addresses), not your conversation. Exported videos get a public share link. See the [privacy policy](https://lumora.video/privacy) and [terms](https://lumora.video/terms).

## Support

[lumora.video/support](https://lumora.video/support) · support@lumora.video · [Docs for agents](https://lumora.video/docs/agents)

MIT licensed.
