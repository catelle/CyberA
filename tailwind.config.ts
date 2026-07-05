import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#E11D48",
          gold: "#FB7185",
          ink: "#242225",
          sky: "#FFF1F2",
          rose: "#FFE4E6",
          graphite: "#3A373B"
        },
        background: "#f7f9fc",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "inverse-on-surface": "#eff1f4",
        "inverse-primary": "#ffb3b5",
        "inverse-surface": "#2d3133",
        "on-background": "#191c1e",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-primary-fixed": "#40000c",
        "on-primary-fixed-variant": "#920027",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5d6466",
        "on-secondary-fixed": "#161d1f",
        "on-secondary-fixed-variant": "#41484a",
        "on-surface": "#191c1e",
        "on-surface-variant": "#5d3f40",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fafdff",
        "on-tertiary-fixed": "#001f28",
        "on-tertiary-fixed-variant": "#004e60",
        outline: "#916e6f",
        "outline-variant": "#e6bcbd",
        primary: "#ba0034",
        "primary-container": "#e51245",
        "primary-fixed": "#ffdada",
        "primary-fixed-dim": "#ffb3b5",
        secondary: "#586062",
        "secondary-container": "#dae1e3",
        "secondary-fixed": "#dde4e6",
        "secondary-fixed-dim": "#c1c8ca",
        surface: "#f7f9fc",
        "surface-bright": "#f7f9fc",
        "surface-container": "#eceef1",
        "surface-container-high": "#e6e8eb",
        "surface-container-highest": "#e0e3e6",
        "surface-container-low": "#f2f4f7",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#d8dadd",
        "surface-tint": "#be0036",
        "surface-variant": "#e0e3e6",
        tertiary: "#00647c",
        "tertiary-container": "#007f9c",
        "tertiary-fixed": "#b7eaff",
        "tertiary-fixed-dim": "#4cd6ff"
      },
      fontFamily: {
        display: ["Montserrat", "Inter", "ui-sans-serif", "system-ui"],
        "body-md": ["Montserrat", "Inter", "ui-sans-serif", "system-ui"],
        "body-lg": ["Montserrat", "Inter", "ui-sans-serif", "system-ui"],
        "headline-lg-mobile": ["Montserrat", "Inter", "ui-sans-serif", "system-ui"],
        "headline-md": ["Montserrat", "Inter", "ui-sans-serif", "system-ui"],
        "headline-lg": ["Montserrat", "Inter", "ui-sans-serif", "system-ui"],
        "label-bold": ["Montserrat", "Inter", "ui-sans-serif", "system-ui"]
      },
      fontSize: {
        display: ["48px", { fontWeight: "900", letterSpacing: "0", lineHeight: "1.1" }],
        "body-md": ["16px", { fontWeight: "500", lineHeight: "1.6" }],
        "body-lg": ["18px", { fontWeight: "500", lineHeight: "1.6" }],
        "headline-lg-mobile": ["24px", { fontWeight: "800", lineHeight: "1.2" }],
        "headline-md": ["24px", { fontWeight: "700", lineHeight: "1.3" }],
        "headline-lg": ["32px", { fontWeight: "800", lineHeight: "1.2" }],
        "label-bold": ["14px", { fontWeight: "700", letterSpacing: "0.05em", lineHeight: "1" }]
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "48px",
        gutter: "24px",
        "card-padding": "24px",
        unit: "8px"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(36, 34, 37, 0.12)",
        glow: "0 18px 42px rgba(225, 29, 72, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
