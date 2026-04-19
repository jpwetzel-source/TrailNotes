# github-practice

Static site in `website/` backed by **Supabase** (tic tac toe demo, live stats, connectivity check). Deploys to **GitHub Pages** from `main` via Actions.

## Run locally

```bash
cd website
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml`. In the GitHub repo: **Settings → Pages → Build and deployment** should use **GitHub Actions**. Pushes to `main` publish the `website/` folder.

## Supabase

1. Create a project at [https://supabase.com](https://supabase.com).
2. **Project Settings → API**: copy **Project URL** and the **publishable** key (`sb_publishable_...`). Never put **secret** keys in the browser or in `website/`.
3. **Local:** from `website/`, copy the example and edit values:

```bash
cd website
cp supabase-config.example.js supabase-config.js
```

`supabase-config.js` is gitignored.

4. **GitHub Pages:** add repository secrets `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. The deploy job generates `supabase-config.js` at build time. Use **Row Level Security** on every table; the publishable key is public to anyone who loads the site.

5. After deploy, use **Check database** on the site when the connectivity migration has been applied.

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
