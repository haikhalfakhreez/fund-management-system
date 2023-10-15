import GithubProvider from "@auth/core/providers/github"
import type { AuthConfig } from "@auth/core/types"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  adapter: DrizzleAdapter(useDb()),
  secret: runtimeConfig.authJs.secret,
  providers: [
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],
}
