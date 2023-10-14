import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        display: ["Cal Sans", "DM Sans", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(59.1% 166.02% at 50% -66.02%, var(--tw-gradient-stops))",
      },
    },
  },
}
