---
name: lumora
description: Make cinematic demo videos of a product with Lumora, from a screen recording or screenshots. Use when the user asks for a demo video, product trailer, launch video, promo clip, app walkthrough video or social video (Reels, TikTok, LinkedIn) of their software.
---

# Lumora: cinematic demo videos

Lumora turns a raw screen recording or screenshot into a short trailer: a 3D camera
move over the UI, depth of field, a light sweep that reveals the screen, callouts that
point at features, a title card and music with a beat drop. You drive it with the
`lumora` MCP tools.

## Setup check

The `lumora` tools run on Lumora's hosted server. If a tool says to sign in, or the token is
invalid, ask the user to connect Lumora: in Claude Code run `/mcp`, pick `lumora` and choose
Authenticate; in other apps use Connect in the connector or plugin settings. A Lumora page
opens where they sign in (or create a free account) and allow access.

## Workflow

1. **Get the media.** Use what the user pointed at: a recording (`.mp4`, `.mov`, `.webm`)
   or screenshots (`.png`, `.jpg`). If they have none, you can take a screenshot of their
   running app. Upload each file: `upload_media` with `url` for a public link (or
   `base64` for a small image); for a file on the user's computer, call `get_upload_link` and
   POST the file to the link it returns (for example with `curl -F file=@demo.mp4 <uploadUrl>`
   when you have a shell). Keep the returned `url`. If the product has a public website and nothing
   else, pass `website: "https://…"` to `create_video` instead of `media`: Lumora screenshots
   the page and takes its colours, font, name, headline and icon.
2. **Pick a style.** Call `list_styles` once. Choose a look from what the product is:
   - Serious B2B, finance, dev tools: **Keynote** or **Blueprint**
   - Launch day hype, consumer apps: **Blockbuster**
   - Design tools, creative, lifestyle: **Golden hour**
   - Gaming, crypto, music, nightlife: **Synthwave**
   - Detail-heavy UI (charts, editors): **Macro lab**
   - Premium, editorial, "serious" brand: **Noir**
   - SaaS launch, landing-page hero, product tour with clicks: **Launch day**
   - Feature walkthrough, onboarding, help-center video: **Walkthrough**
   - Feature tour up close, buttons that press down: **Close-up tour** (the camera glides
     zoomed in from one callout to the next, so order callouts left to right)
   - Short social teaser, energetic announcement: **Hype reel**
   - iPhone or Android app (portrait screenshot): **App Store**
   - Long phone screen or feed (a tall full-page screenshot): **Scroll story**
   - macOS desktop app: **Desktop launch**
   - Windows desktop app, power-user tools: **Power user**
   If the user gave brand colours, pass them as `colors` (three hex values).
   No screenshot yet? `list_styles` also lists 25 templates (invoicing, CRM, dev tools,
   stores, banking, food delivery, code editors…). Pass one as `template` to show the user a
   finished example in that style, then swap in their own media.
3. **Create it.** Call `create_video` with `media`, and either:
   - a `brief` (one or two sentences about the product) and Lumora's AI writes the copy and
     places callouts by looking at the screen, or
   - explicit `title`, `tagline`, `intro` and `callouts` when you already know what to say.
   Explicit fields win over the brief, so you can combine them.
4. **Check it.** Call `preview_frame` at 2–3 moments (for example 30 %, 60 % and the last
   second) and look at the images. Fix what is off with `update_video`: callout positions
   (`x`, `y` are 0..1 of the screenshot), typos, a look that does not fit. If the person
   wants "something different", `update_video` with `shuffle: true` draws a fresh camera,
   palette, motion and finishing effects that fit together, keeping the words and timing.
   `copyNotes` in the result flags stock phrases and over-long lines; fix them if they are yours.
   `filmCheck` is the final check: fix every `fix:` note (a shot too quick to read, text off
   the frame, a callout hidden under a shot) before rendering; `tip:` notes are taste.
5. **Export.** Call `render_video`. It waits up to about 50 seconds; if it is still
   rendering, call `render_status` with the `renderId` until it is `done`. A 12 s video
   usually takes one to three minutes.
6. **Hand over** the `shareUrl` (a public watch page) and the `downloadUrl` (MP4), plus
   the `editorUrl` so the user can fine-tune it on the timeline. To put the video in a
   README-linked site, docs or a changelog page, use `embedUrl` in an iframe; pasting the
   `shareUrl` into Notion or WordPress embeds it too (oEmbed).

## Writing good callouts

- Two to four callouts. Each one points at a real UI element and says what it does for
  the user, in at most ~32 characters: "Live revenue, zero setup", not "Revenue chart".
- Place `x`, `y` on the centre of the element itself; the label floats above it.
- Give `w` and `h` (the element's width and height as 0..1 of the screen), so circles,
  highlights, the button press and the magnifier fit the element.
- Add one `zooms` entry on the most impressive detail for a close-up push-in
  (`{ x, y, start, duration }`, scale 1.6–1.9).

## Callout and title styles

`calloutStyle` sets how every callout points at the UI; a single callout can override it
with its own `style`:
- `glass` (default glowing card) or `pill` (gradient pill on an elbow line): polished SaaS
- `bubble` (white speech bubble that pops in): friendly consumer and phone apps
- `underline` or `circle` (hand-drawn ink) and `arrow` (curved arrow to the element):
  tutorials and walkthroughs
- `marker` (highlighter sweep plus a sticky tag): feeds, documents, long text
- `brackets` (viewfinder corners and an uppercase tag): dev tools, technical products
- `typewriter` (label types itself out)

`textStyle` animates the intro words and the end title: `blur` (focus pull, default),
`typewriter`, `split` (letters flip up in 3D), `wipe` (a light bar reveals the text),
`scramble` (decodes from random glyphs) or `punch` (words slam in one by one). Looks set a
matching pair; pass these only to change them.

`dropStyle` sets how the camera hits the beat drop: `pulse` (a quick push in, default),
`shake` (a short jolt), `tilt` (the frame rolls and settles) or `none` (calm, no hit).
Looks vary it; use `none` for calm B2B videos.

## Formats and length

- `format`: `landscape` (16:9, websites, YouTube), `vertical` (9:16, Reels, TikTok,
  Shorts), `square` (1:1, LinkedIn, X). In narrow formats the camera follows callouts.
- `duration`: 8–15 s works best for social, up to 60 s. For recordings, use
  `recordingStart` to skip a slow start and `recordingSpeed` (1.5–3) to tighten it.
  For long recordings, `speedUpStill: true` plays the parts where nothing moves 4× faster,
  and `recordingParts: [{from, to, speed}]` keeps only those source seconds, each at its own speed.
- `autoZoom: true` finds typing, clicks and moving parts in the recording and zooms in on
  them, like a cursor-following recorder. Use it for any recording unless you place `zooms`.
- Recorded a webcam next to the screen? Upload it and pass `webcam` for a corner bubble that
  follows the recording's cuts; `webcamSound: true` uses its microphone.
- Someone talks in the recording? `captionsFromSpeech: true` keeps its sound and captions
  what is said. For a separate voiceover, upload the audio and pass `voiceoverFile`.
  Add `cleanVoice: true` for less background noise and `tightenPauses: true` to speed up
  long pauses between words. `removeFillers: true` cuts um/uh/öö, and `cutWords: ["wait,
  wrong tab"]` cuts a phrase that was said (screen and sound together). `trimDeadEnds: true`
  cuts the still screen at the start and end of a recording.
- Want several formats? Create the first video, then `create_video` again with the same
  spec and another `format`, or render after `update_video` changes the format.

## Effects

`effects` adds finishing touches on top of a look: `grain` (0..1), `lightLeak`,
`letterbox`, `chroma`, `flare`, `flash`, `scanlines`, `mono`, `vignette` (0..1), and for
software demos `browser` (browser window with URL bar), `cursor` (moves to each callout and
clicks), `spotlight` (dims everything except the active callout), `reflection` (glossy
floor), `glitch` and `speedLines` (both hit on the beat drop). Use one or two on top of a
look; they merge into what the look set, and `false` turns one off. `cursor` and
`spotlight` need callouts to aim at. `sfx` (soft ticks, pops and whooshes under the music)
is on by default; set it to `false` for a silent mix.

For phone and desktop apps: `taps` (finger taps instead of a cursor), `scroll` (scrolls a
tall screenshot top to bottom, pausing at each callout), `notification` (a push banner on the
drop), `appIntro` (opens on the app icon), `desktop` (wallpaper, menu bar and dock or Windows
taskbar; the window opens out of the dock), `stack` (two more copies: phones fan out,
windows cascade) and `handheld` (slight camera shake). A callout can carry `keys`, such as
`"⌘ K"`, to show a keyboard shortcut as keycaps; ⌘ becomes Ctrl on Windows and Android.

Detail touches: `press` (the element under each callout lifts, presses down and springs
back like a real button; give callouts `w`/`h`), `loupe` (a magnifier enlarges the element)
and `confetti` (a burst over the end card, for launches). Phones and laptops are drawn as 3D
devices with real edge thickness, so camera turns show their sides.

## Voice, captions, device and CTA

- `script`: what a narrator says (about 2.2 words per second of video, ending before the
  title card). With a `brief`, Lumora writes it for you. The script drives the captions; for
  spoken narration, upload the user's own recording as `voiceoverFile`.
- `captions`: `pop` (bold, social), `clean` (subtitle box, B2B) or `karaoke`. Use captions for
  vertical videos: most social feeds autoplay muted. MP4 exports also get `.srt` and `.vtt`.
- `device`: frames the screen and moves with the camera. `macbook` or `ipad` for web apps,
  `iphone` or `android` for portrait phone screenshots, `macwindow` or `winwindow` for
  desktop apps (the title bar shows the video's `title`). Phone looks set this for you.
- `cta`: `{ text, url }` on the end card and as a button on the share page, which also tracks
  views, watch-through and CTA clicks.
- `exportFormat` in `render_video`: `mp4` (default), `gif` (for READMEs and posts) or `webm`.

## Shots, launch films and sound

For a launch or promo video (not a plain walkthrough), pass `launchFilm: true`: the video
opens on the product name with the screen inside the letters, plays the demo, deals the
screen out as cards, lands the logo and ends on the call to action. For finer control pass
`shots` (it replaces the current ones): each `{ kind, start, duration, … }` covers the whole
frame and cuts back to the demo. Kinds are in `list_styles` → `shots`; the useful ones are
`headline` (`text`, `style`), `stat` (`stats: [{ value, suffix, label }]`), `chart` (`bars`),
`deck`, `screen` (`style: "crash"` pushes hard onto `focus`), `logo` and `cta`. Transitions
(`in`, `out`): cut, fade, flash, wipe, iris, whip, zoom, glitch. Keep shots short and few:
the product screen should stay on for most of the video, at most three flashes or glitches.
`sfxStyle` sets the sound: `minimal`, `soft` (default) or `punchy` (launch films start
punchy). `render_video` takes `music: false` to leave the music out and `package: true` for a
zip to keep editing elsewhere (each shot as a clip, music/sfx/voice stems, captions, timeline).

## Brand kits (Team plan)

If `list_styles` shows `brandKits`, the user's team has saved its branding: logo, brand
colours, music, call to action and styles. Pass `brandKit: "<name>"` in `create_video` and the
video is on brand in one go; fields you also pass (for example `palette`) still win. To save
a new kit, call `save_brand_kit` with `name` and either `fromVideo` (copy a finished video's
branding) or the fields themselves. On Free or Pro, `brandKits` explains it is a Team feature.

## Limits

Free plan exports are 720p with a watermark and limited per month; a 402 error means the
user has run out and can upgrade in Lumora. Never retry a render in a loop on that error.
