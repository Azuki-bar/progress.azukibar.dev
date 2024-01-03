import { Hono } from 'hono'
import { PageStats, fetchStats } from './fetchJson'
import { PageHTML } from './templates/pages'

type EnvBindings = {
  MY_KV_NAMESPACE: KVNamespace
}
// ユーザに露出する情報
type ProgressStats = {
  pagesCount: number
  referencesCount: number
}
const PageStatsToProgressStats = (stats: PageStats): ProgressStats => {
  return {
    pagesCount: stats.page,
    referencesCount: 0,
  }
}

export const allowedProjects = ["sotsuron"] as const
export type AllowedProject = typeof allowedProjects[number]
const IsAllowedProject = (name: string): name is AllowedProject => {
  return allowedProjects.includes(name as AllowedProject)
}


const app = new Hono<{ Bindings: EnvBindings }>()

app.get('/', (c) => {
  return c.redirect("/sotsuron")
})

app.get(":project", async (c) => {
  const projectName = c.req.param('project')
  if (!IsAllowedProject(projectName)) { return c.notFound() }

  const stats = await fetchStats(c.env.MY_KV_NAMESPACE, projectName)
  if (stats === null) { c.status(500); return c.body("Internal Server Erroa  r") }
  return c.html(PageHTML({ pagesCount: stats.page }))
})

app.get(":project/json", async (c) => {
  const projectName = c.req.param('project')
  if (!IsAllowedProject(projectName)) { return c.notFound() }

  const rawStats = await fetchStats(c.env.MY_KV_NAMESPACE, projectName)
  if (rawStats === null) { c.status(500); return c.body("Internal Server Error") }

  return c.json(PageStatsToProgressStats(rawStats))
})

export default app
