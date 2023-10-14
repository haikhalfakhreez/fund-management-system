import { resolve } from "node:path"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@hebilicious/authjs-nuxt",
    "@nuxtjs/fontaine",
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    authJs: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NEXTAUTH_URL,
        verifyClientOnEveryRequest: true,
      },
    },
  },
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
    ".prisma/client/index-browser":
      "./node_modules/@prisma/client/index-browser.js",
  },
  ui: {
    icons: ["heroicons", "mdi"],
  },
  css: ["~/assets/css/font.css"],
  fontMetrics: {
    fonts: ["DM Sans"],
  },
  googleFonts: {
    display: "swap",
    download: true,
    families: {
      "DM+Sans": [400, 500, 600, 700],
    },
  },
})
