/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary": "var(--accent-color)",
        "accent-purple": "var(--accent-purple)",
        "background": "var(--bg-secondary)",
        "bg-deep": "var(--bg-primary)",
        "surface": "var(--bg-card)",
        "surface-variant": "var(--bg-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "border-slate": "var(--border-color)",
        "outline": "var(--border-subtle)",
        
        // Retain legacy container vars mapping just in case
        "on-primary-container": "#00285d",
        "surface-container-high": "#222a3d",
        "primary-container": "var(--accent-color)",
        "bg-surface": "var(--bg-card)",
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "stack-sm": "12px",
        "stack-lg": "48px",
        "gutter": "24px",
        "section-gap": "160px",
        "stack-md": "24px",
        "container-max": "1200px",
        "section-gap-mobile": "80px"
      },
      "fontFamily": {
        "headline-md": ["var(--font-display)"],
        "label-caps": ["var(--font-display)"],
        "body-lg": ["var(--font-body)"],
        "headline-lg": ["var(--font-display)"],
        "display-hero": ["var(--font-display)"],
        "mono-label": ["var(--font-mono)"],
        "display-hero-mobile": ["var(--font-display)"],
        "body-base": ["var(--font-body)"]
      },
      "fontSize": {
        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
        "label-caps": ["14px", { "lineHeight": "20px", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "32px", "fontWeight": "400" }],
        "headline-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "display-hero": ["90px", { "lineHeight": "90px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "mono-label": ["13px", { "lineHeight": "16px", "fontWeight": "500" }],
        "display-hero-mobile": ["56px", { "lineHeight": "60px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-base": ["16px", { "lineHeight": "28px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [],
}
