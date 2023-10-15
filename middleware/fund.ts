export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) return

  const paramsId = to.params.id as string
  // const fund = await $fetch(`/api/funds/${paramsId}`)

  // if (!fund) {
  //   return abortNavigation()
  // }

  return
})
