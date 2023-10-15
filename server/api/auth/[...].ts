import { NuxtAuthHandler } from "#auth"
import { authOptions } from "~/lib/auth"

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler(authOptions, runtimeConfig)
