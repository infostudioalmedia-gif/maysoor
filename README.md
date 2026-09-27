# Maysoor (ميسور) — Landing Page

صفحة الهبوط لمنصة **ميسور**، منصة التوعية المالية للأطفال من 7 إلى 10 سنين.
الشعار: **ميسور.. لبناء جيل واعي مالياً**

The page is plain HTML, CSS and JavaScript. It is Arabic, right-to-left, and follows the Material 3 Expressive brand system. There is no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html              All sections: hero, problem, journey, plans, trust, signup
assets/css/tokens.css   Design tokens (colors, fonts, radii, shadows): edit the brand here
assets/css/styles.css   Components and layout
assets/js/main.js       Scroll reveal, sticky header, signup form validation
assets/img/             Logo, hero and step illustrations (SVG placeholders)
```

## Brand rules that matter in code

- **Teal Mint `#00A896` and Coral Orange `#FF5733` are fill colors only.** White text on them fails WCAG AA (2.98:1 and 3.15:1). Put Deep Slate `#1E293B` text on them.
- **Teal text on the cream background** uses Deep Teal `#007A6D` (5.01:1).
- **Coral is reserved for the primary call to action.** Use it once per screen.
- **Shapes:** buttons are pills (`9999px`), and cards use a `24px` radius with soft shadows.
- **Fonts:** Baloo Bhaijaan 2 for headings and Tajawal for body, both loaded from Google Fonts. Icons are Material Symbols Rounded.

The same brand system is used for videos through the `maysoor` style playbook in OpenMontage (`styles/maysoor.yaml`).

## Before launch

- [ ] **Connect the signup form.** Set `SIGNUP_ENDPOINT` in `assets/js/main.js` to your form backend (Formspree, a CRM webhook, or your own API). Until then, the form only validates input and shows the success message, and nothing is sent.
- [ ] **Replace the placeholder illustrations** in `assets/img/` with the final Malik & Nour artwork.
- [ ] **Link the demo video.** Point the "شاهد العرض التوضيحي" button to the real demo.
- [ ] **Confirm the claims.** Check that "آلاف العائلات" and "بيئة آمنة 100%" are accurate before publishing.
- [ ] **Add an Open Graph image.** Add `og:image` for link previews.

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. For GitHub Pages, go to **Settings → Pages**, set **Source** to the `main` branch at `/ (root)`, and save.
