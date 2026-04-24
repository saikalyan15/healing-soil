# GSC Blog Pipeline — Execution Plan

Last updated: 2026-04-24. Status: approved for build.
Companion to [gsc-blog-pipeline.md](gsc-blog-pipeline.md) and [task-tracker.md](task-tracker.md).

---

## What you are building

A repeatable workflow that:
1. Reads your Google Search Console data automatically (no screenshots, no copy-paste)
2. Scores your ranking opportunities and shows you a shortlist
3. Writes a compliant MDX blog post draft for the topic you pick
4. Wires the FAQ schema and outputs the image prompt

Total setup time: ~60 minutes (most of it waiting for Google Cloud to activate things).
Weekly usage time: ~15–20 minutes per post.

---

## Who does what

| Task | Who | Time |
|---|---|---|
| Google Cloud project + API setup | **You** | 20 min |
| Service account JSON download | **You** | 5 min |
| Add service account to Search Console | **You** | 5 min |
| Build the MCP server files | **Claude** | — |
| Run `npm install` in the MCP folder | **You** | 2 min |
| Update `mcp.json` config | **Claude** | — |
| Write the skill file | **Claude** | — |
| First test run to verify it works | **Together** | 10 min |
| Voice-edit each draft before publishing | **You** | 15 min/post |

---

## Phase 1 — Google Cloud Setup (YOU)

You need a Google Cloud project with Search Console API access, and a service account (a bot identity) that can read your GSC data.

### Step 1.1 — Create a Google Cloud project

1. Open [console.cloud.google.com](https://console.cloud.google.com) in your browser. Sign in with the Google account that owns your Search Console property.
2. At the top of the page, click the project selector dropdown (it shows your current project name or "Select a project").
3. Click **New Project** in the top-right of the dialog that opens.
4. **Project name:** `healing-soil-seo` (any name works, this is just for your reference)
5. Click **Create**. Wait ~10 seconds for it to provision.
6. Make sure the new project is now selected in the dropdown at the top.

### Step 1.2 — Enable the Search Console API

1. In the left sidebar, click **APIs & Services** → **Library**.
2. In the search box, type: `Google Search Console API`
3. Click the result that says **Google Search Console API** (by Google).
4. Click the blue **Enable** button. Wait for it to activate (usually <30 seconds).

### Step 1.3 — Create a service account

A service account is like a bot identity — it has its own email address and can be granted read access to your Search Console data.

1. In the left sidebar, click **APIs & Services** → **Credentials**.
2. At the top, click **+ Create Credentials** → **Service Account**.
3. Fill in:
   - **Service account name:** `gsc-reader`
   - **Service account ID:** auto-fills as `gsc-reader` (leave it)
   - **Description:** `Reads Search Console data for Claude Code`
4. Click **Create and Continue**.
5. On the "Grant access" step — skip it (click **Continue**, then **Done**). You do not need to grant project-level roles for this use case.

### Step 1.4 — Download the JSON key

1. Back on the Credentials page, you should see your new service account listed under "Service Accounts."
2. Click the service account email (it looks like `gsc-reader@healing-soil-seo.iam.gserviceaccount.com`).
3. Go to the **Keys** tab.
4. Click **Add Key** → **Create new key**.
5. Choose **JSON** format. Click **Create**.
6. A JSON file downloads automatically to your computer (usually named something like `healing-soil-seo-abc123.json`).
7. **Move this file to a safe, permanent location.** Suggested path:
   ```
   C:\Users\sai\secrets\gsc-service-account.json
   ```
   Create the `secrets` folder if it does not exist. This file never goes into the git repo.

> **Security note:** This JSON file is a credential. Anyone who has it can read your Search Console data. Keep it in `C:\Users\sai\secrets\` and never commit it.

### Step 1.5 — Grant the service account access to Search Console

This step links the service account to your actual Search Console property so it can read data.

1. Open [search.google.com/search-console](https://search.google.com/search-console) in a new tab.
2. Select your property: `healingsoil.in` (or `sc-domain:healingsoil.in`).
3. In the left sidebar, scroll down to **Settings**.
4. Click **Users and permissions**.
5. Click **Add user** (or the + button).
6. In the email field, paste the service account email you just created. It looks like:
   ```
   gsc-reader@healing-soil-seo.iam.gserviceaccount.com
   ```
   You can find this on the Credentials page in Google Cloud Console.
7. Set permission to **Restricted** (read-only is fine; we never write to GSC).
8. Click **Add**.

Phase 1 is done. You now have a JSON key file that lets a program read your GSC data.

---

## Phase 2 — MCP Server (CLAUDE builds, YOU run 1 command)

Claude will create a small Node.js server file in your project at `tools/gsc-mcp/`. This is the bridge between Claude Code and Google Search Console.

**What you need to do after Claude creates the files:**

1. Open a terminal in VS Code (`Ctrl + backtick`).
2. Run:
   ```bash
   cd tools/gsc-mcp && npm install
   ```
3. That's it. You will see packages installing. Takes ~20 seconds.

The MCP server uses three tools:
- `get_opportunities` — pulls last 28 days of data, scores and ranks ranking gaps
- `get_top_queries` — top queries by impressions with clicks, CTR, position
- `get_ctr_outliers` — queries with high impressions and low CTR (title rewrite candidates)

---

## Phase 3 — Configure Claude (CLAUDE does this)

Claude will update `C:\Users\sai\.claude\mcp.json` to add the GSC server as a third entry alongside `playwright` and `fetch`.

After the update, you need to **restart Claude Code** (close and reopen the VS Code extension, or run `claude` fresh in terminal) for the new MCP to load.

You will know it worked when Claude Code shows a green MCP indicator for `gsc` in the status bar, or when calling the skill does not say "tool not found."

---

## Phase 4 — The Skill File (CLAUDE does this)

Claude will create the skill file at:
```
C:\Users\sai\.claude\commands\brands\healing-soil\gsc-blog-pipeline.md
```

The skill is designed in **two separate modes** to protect your session token budget:

| Mode | What it does | Approx tokens used |
|---|---|---|
| `analyze` | Pulls GSC data, scores opportunities, shows ranked shortlist | ~5–8k |
| `draft [topic]` | Loads brand voice, writes MDX post, wires schema, outputs image prompt | ~15–25k |

Running them separately means a tight session can still finish the analysis step, and you start the draft in a fresh session when you have full budget.

---

## Phase 5 — First Test Run (TOGETHER)

Once Phases 1–4 are done, run this in a fresh Claude Code session:

```
/brands:healing-soil:gsc-blog-pipeline analyze
```

Expected output:
- A table of ranked opportunities (new post topics, CTR-rewrite candidates, on-page optimization targets)
- At least one of the three topics from the 2026-04-24 manual run should appear (handmade soap Goa, Bangalore, sensitive skin India)

If the ranked list is empty or throws an error, tell Claude what the error says — the most common causes are a wrong path to the JSON key, or the service account not yet added to Search Console.

---

## How to use it every week

This is the steady-state workflow once setup is complete.

### Session A — Analyze (5–10 minutes)

Open Claude Code. Start a new session.

```
/start-here
/brands:healing-soil:gsc-blog-pipeline analyze
```

Claude pulls 28 days of GSC data, scores the opportunities, and shows you a ranked table. You read it and pick one topic. Write down your pick — you will use it in Session B.

### Session B — Draft (15–20 minutes, new session)

Open Claude Code. Start a **new** session (fresh token budget).

```
/start-here
/brands:healing-soil:gsc-blog-pipeline draft "handmade soap Kerala"
```

Claude loads brand voice, compliance rules, writes the full MDX post, adds the FAQ schema entry, and outputs the image prompt. At the end it prints a handoff reminder.

### After Session B — Your 15 minutes

1. Open the new MDX file in `content/blog/`.
2. Read it aloud. Change any sentence that sounds written-not-said.
3. Add one detail only you would know (a specific ingredient batch, something you noticed while making it, a customer question that prompted the topic).
4. Generate the image in ChatGPT using the prompt Claude output.
5. Add the image to `public/images/blog/`, update the frontmatter `featuredImage` field.
6. Run `npm run dev`, preview the post, then `git commit` and deploy.

---

## Token efficiency rules

These keep you from hitting the daily session limit mid-task:

1. **Always start sessions with `/start-here`** before `/gsc-blog-pipeline`. The session loader primes brand context in fewer tokens than loading it mid-task.
2. **Split analyze and draft into separate sessions.** Never run both in the same session unless the analyze output was very short.
3. **One post per session.** The draft stage for a 900-word post uses roughly 15–25k tokens. Two posts in one session will hit the limit.
4. **Do not ask Claude to "also fix the schema for the old posts" mid-draft.** Save scope expansion for a new session. Ticket it in `docs/task-tracker.md` instead.
5. **If a session ends before the FAQ schema step:** just run the skill again with a note: "the MDX is already written at `content/blog/[slug].mdx`, skip to the schema step."

---

## What stays manual forever

These four things do not get automated, by design:

| Task | Why manual |
|---|---|
| Voice-editing the draft | Google HCU down-weights obviously AI-written posts. Your voice is the moat. |
| Generating the actual image | Requires ChatGPT / Midjourney. An image MCP is a v2 decision after MVP proves itself. |
| Picking which topic to work on | Editorial judgment. The ranked list is input to your decision, not a replacement for it. |
| `git commit` and deploy | You decide when something is ready to ship. |

---

## Troubleshooting quick-reference

| Problem | Likely cause | Fix |
|---|---|---|
| `gsc` MCP not listed in Claude | `mcp.json` not saved, or Claude not restarted | Restart Claude Code |
| "Permission denied" error from MCP | Service account not added to Search Console | Repeat Step 1.5 |
| "File not found" for JSON key | Wrong path in `mcp.json` | Check `GSC_KEY_FILE` path in mcp.json |
| Empty opportunities list | Less than 28 days of data, or site has very few impressions | Normal for a new site — the list will grow |
| MCP throws "module not found" | `npm install` not run in `tools/gsc-mcp/` | Run `cd tools/gsc-mcp && npm install` |
| Draft violates CDSCO rules | Model slipped past the compliance gate | Tell Claude which phrase is non-compliant; it will fix it in place |

---

## Files created by this plan

```
tools/
  gsc-mcp/
    package.json         ← MCP server dependencies
    server.js            ← MCP server (Claude builds this)

C:\Users\sai\.claude\
  mcp.json               ← updated by Claude to add gsc entry
  commands\brands\healing-soil\
    gsc-blog-pipeline.md ← new skill file (Claude builds this)

C:\Users\sai\secrets\
  gsc-service-account.json  ← YOU create this in Phase 1
```

---

## Next step right now

Say: **"Build Phase 2 and Phase 4"** — Claude will create the MCP server files and the skill file in one go. Then you follow Phase 1 (Google Cloud setup) at your own pace, and the two tracks meet at Phase 5.
