import { prisma } from "~/prisma/db"

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) return

  const id = await prisma.fund.findUnique({
    where: {
      id: to.params.id as string,
    },
  })

  if (!id) {
    return abortNavigation()
  }

  return
})
