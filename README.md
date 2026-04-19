# TrailNotes

Production project: the **app prototype** lives in `website/prototype/` and deploys to **GitHub Pages** from `main` (site root is the prototype). The rest of `website/` (tic tac toe demo, live stats, Supabase connectivity) is for **local** runs. The `github-practice` repository stays a separate template and is not the deploy target for this project.

## Run locally

```bash
cd website
python3 -m http.server 8080
```

Open `http://localhost:8080` for the Supabase demo, or `http://localhost:8080/prototype/index.html` for the prototype.

## GitHub Pages (prototype)

Workflow: `.github/workflows/deploy-pages.yml`.

1. In the GitHub repo: **Settings → Pages → Build and deployment**, set source to **GitHub Actions** (not “Deploy from a branch”).
2. Push to `main` (or run the workflow manually). The published site is **only** the contents of `website/prototype/`, so the **site root is the dashboard**.

**URLs** (replace `OWNER` and `REPO` with your GitHub user or org and repository name):

- Project site: `https://OWNER.github.io/REPO/` (opens `prototype/index.html` as `/index.html`)
- Other screens: `https://OWNER.github.io/REPO/trips.html`, `https://OWNER.github.io/REPO/journal.html`, `https://OWNER.github.io/REPO/journal-entry.html`, `https://OWNER.github.io/REPO/profile.html`

To publish the **full** `website/` folder again (tic tac toe at `/`), change the workflow step **Upload artifact** to `path: website` instead of `website/prototype`.

### Deploy fails: `Get Pages site failed` / `HttpError: Not Found`

That response means GitHub does not yet have a **Pages site** configured for this repository, or the source is not **GitHub Actions**.

1. Open **Settings → Pages** for the repo.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not *Deploy from a branch*). If you only see branch deploy, pick any branch once, save, then switch to **GitHub Actions** when GitHub shows it.
3. Save, then in **Actions** open the failed workflow and **Re-run all jobs**.

`actions/configure-pages` cannot create the site with the default `GITHUB_TOKEN` alone. Turning on Pages in the UI is required once per repo.

The Node.js 20 deprecation notice in logs comes from older action runtimes. This repo’s workflow uses current major versions of the Pages actions where possible.

## Supabase

1. Create a project at [https://supabase.com](https://supabase.com).
2. **Project Settings → API**: copy **Project URL** and the **publishable** key (`sb_publishable_...`). Never put **secret** keys in the browser or in `website/`.
3. **Local:** from `website/`, copy the example and edit values:

```bash
cd website
cp supabase-config.example.js supabase-config.js
```

`supabase-config.js` is gitignored.

4. **Optional CI:** you can add repository secrets `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` so the workflow still writes `website/supabase-config.js` in the runner (useful for local clones or if you switch Pages back to publishing all of `website/`). The **prototype** on Pages does not load that file. Use **Row Level Security** on every table; the publishable key is public to anyone who loads a page that embeds it.

5. After you run the full site locally with config, use **Check database** on `http://localhost:8080/` when the connectivity migration has been applied.

6. **Tic tac toe:** run `supabase/migrations/20260418210000_tic_tac_toe_games.sql` in the SQL Editor (or apply migrations with the CLI). The connectivity probe is `supabase/migrations/20260418120000_app_connectivity_probe.sql` if you use **Check database**.

The client loads `@supabase/supabase-js` from `website/js/supabase-client.js` (ES module via `esm.sh`).

## Supabase in Cursor / VS Code

The workspace recommends the official **Supabase** extension (`.vscode/extensions.json`).

1. Install **Supabase** (`supabase.vscode-supabase-extension`).
2. Install the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) (for example `brew install supabase` on macOS).
3. From the repo root: `supabase link` when you want the CLI tied to the hosted project.
4. Use `supabase db pull` to sync remote schema into `supabase/migrations` as needed.

## New GitHub repo (reference)

**Website:** create an empty repo, then:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

**CLI:**

```bash
gh auth login
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push
```

See [GitHub Pages documentation](https://docs.github.com/pages) for custom domains and more.
