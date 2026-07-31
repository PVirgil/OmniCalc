# OmniCalc

A futuristic, dependency-free calculator website ready for GitHub and Netlify.

## Included

- Responsive high-tech interface
- Search and keyboard shortcut (`Ctrl/Cmd + K`)
- Category filtering
- 12 working calculators
- Reusable data-driven calculator architecture
- Real-time results and validation
- Accessible modal calculator interface
- Netlify configuration and security headers
- No build step and no package installation

## Run locally

Because asset paths start at `/`, use a small local server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy with GitHub + Netlify

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In Netlify, choose **Add new project** → **Import an existing project**.
4. Connect GitHub and select the repository.
5. Netlify will read `netlify.toml`. No build command is needed; the publish directory is `.`.
6. Deploy.

Every push to the connected branch can trigger a fresh deployment.

## Add another calculator

Add an object to the `calculators` array in `app.js`:

```js
{
  id: "simple-example",
  name: "Simple Example",
  category: "Math",
  icon: "∑",
  accent: "#61f6ff",
  description: "Explain what the calculator does.",
  formula: "z = x + y",
  fields: [
    { key: "x", label: "Value X", type: "number", value: 10 },
    { key: "y", label: "Value Y", type: "number", value: 5 }
  ],
  calculate: values => ({
    value: String(values.x + values.y),
    extra: "Optional explanation"
  })
}
```

Add a new category name to the `categories` array if needed.

## Important production notes

This repository is a polished MVP, not literally every equation in every industry. A production-scale formula platform should move calculator definitions into a database or CMS, add automated tests, expert review, citations, localization, analytics, and dedicated disclaimers for regulated or safety-critical calculations.

Fonts are loaded from Google Fonts. Replace those links with system fonts if you require a fully self-hosted or offline site.

## License

Use and modify this starter for your own project. Third-party font licensing remains subject to the font provider's terms.
