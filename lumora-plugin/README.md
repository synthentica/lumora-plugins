# Lumora plugin

Make cinematic product demo videos from Claude or Codex. Lumora turns a screen recording, a screenshot or a public website into a short video: a 3D camera move over your interface, callouts that point at features, captions, a device frame, a title card, music and a call to action. Preview frames before you export, then get an MP4, GIF or WebM with a share link.

## What's inside

- **MCP server connection** to Lumora's hosted server at `https://lumora.video/mcp` (streamable HTTP). Nothing runs on your computer and nothing is installed.
- **`lumora` skill** that tells the assistant how to direct a good demo: which look fits which product, how to write callouts, and to check preview frames before exporting.

## Install

Claude Code:

```
/plugin install lumora --marketplace synthentica/lumora-plugins
```

Codex: `codex plugin marketplace add synthentica/lumora-plugins`, then `codex plugin add lumora@lumora`.

## Connect

When you first use a Lumora tool, the app asks you to connect. A Lumora page opens where you sign in or create a free account and choose **Allow**. In Claude Code, run `/mcp`, pick `lumora` and choose **Authenticate**.

A free account includes three exports a month (720p, watermark). [Pro and Team](https://lumora.video/#pricing) remove the limit.

## Tools

| Tool | What it does | Changes data |
|---|---|---|
| `list_styles` | Looks, camera moves, palettes, effects, formats, templates and your team's brand kits | No |
| `upload_media` | Upload a recording, screenshot, logo or music from a public URL or as base64 | Yes |
| `get_upload_link` | One-time link for uploading a file from your computer | Yes |
| `create_video` | Create a video project from a spec, a one-line brief, or a website | Yes |
| `update_video` | Change part of a video project | Yes |
| `get_video`, `list_videos` | Read your video projects | No |
| `preview_frame` | Render one frame as an image | No |
| `render_video` | Export MP4, GIF or WebM with a share link | Yes |
| `render_status` | Progress of an export | No |
| `save_brand_kit` | Save your team's logo, colours, music and call to action (Team plan) | Yes |

## What it sends and where

- Tool calls go only to `https://lumora.video`, signed in as your Lumora account with OAuth.
- Lumora receives what the assistant puts in a tool call: the video spec, the files or file URLs you upload, and website addresses you ask it to use. It does not receive your conversation.
- When a call names a public URL (`upload_media` with `url`, or `website` in `create_video`), Lumora's server downloads that file or opens that page.
- With a `brief`, Lumora sends one frame of your media and the brief to Anthropic's API to write titles and callouts.
- Exported videos get a public share link. Anyone with the link can watch that video.

## Privacy

Lumora's [privacy policy](https://lumora.video/privacy) explains what is collected, why, who processes it (Oracle Cloud in Frankfurt for hosting, Stripe for payments, Anthropic for AI direction, Resend for email), how long it is kept, and your rights. In short: we store your account, uploads, projects and exports until you delete them; we don't sell data or train AI models on your content; deleting your account removes everything and ends every connection.

## Support

[lumora.video/support](https://lumora.video/support) · support@lumora.video · [Terms](https://lumora.video/terms)

## License

MIT
