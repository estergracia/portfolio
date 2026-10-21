"""Build a single-file browser preview (React + Tailwind CDN) from src/App.jsx and src/index.css."""
import re, sys
src_dir, out = sys.argv[1], sys.argv[2]
app = open(f"{src_dir}/App.jsx", encoding="utf-8").read()
css = open(f"{src_dir}/index.css", encoding="utf-8").read()

app = re.sub(r'^import \{([^}]*)\} from "react";', r'const {\1} = React;', app, count=1, flags=re.M)
app = app.replace("export default function App", "function App")
assert "import " not in app.split("const profile")[0].replace("const {", ""), "leftover import"

css = css.replace('@import "tailwindcss";', "")
css = re.sub(r"@theme inline \{.*?\n\}", "", css, flags=re.S)

html = f'''<title>Esther Gracia Claudya Portfolio</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
{css}
</style>
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
<script>
  tailwind.config = {{
    theme: {{
      extend: {{
        colors: {{
          bg: "var(--bg)", surface: "var(--surface)", chip: "var(--chip)",
          ink: "var(--ink)", muted: "var(--muted)", line: "var(--line)",
          accent: "var(--accent)", glass: "var(--glass)", onpastel: "var(--on-pastel)",
          pastel: {{ sky: "var(--c-sky)", mint: "var(--c-mint)", butter: "var(--c-butter)", blush: "var(--c-blush)" }},
        }},
        fontFamily: {{
          sans: ['"Schibsted Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
          serif: ['"Instrument Serif"', "Georgia", "serif"],
          mono: ['"DM Mono"', "ui-monospace", "monospace"],
        }},
      }},
    }},
  }};
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.4/babel.min.js"></script>

<div id="root"></div>

<script type="text/babel" data-presets="react">
{app}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
'''
open(out, "w", encoding="utf-8").write(html)
print("wrote", out, len(html), "bytes")
