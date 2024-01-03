import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { PageStats, fetchStats } from './fetchJson'
import { PageHTML } from './templates/pages'

type EnvBindings = {
  MY_KV_NAMESPACE: KVNamespace
}
// ユーザに露出する情報
export type ProgressStats = {
  pagesCount: number
  lastUpdatedAt: number
}
const PageStatsToProgressStats = (stats: PageStats): ProgressStats => {
  return {
    pagesCount: stats.page,
    lastUpdatedAt: stats.lastUpdatedAt,
  }
}

export const allowedProjects = ["sotsuron"] as const
export type AllowedProject = typeof allowedProjects[number]
const IsAllowedProject = (name: string): name is AllowedProject => {
  return allowedProjects.includes(name as AllowedProject)
}

const successfulCacheControl = 'public, max-age=30' as const;

const app = new Hono<{ Bindings: EnvBindings }>()
app.use('*', logger())

app.get('/', (c) => {
  return c.redirect("/sotsuron")
})

app.get(":project", async (c) => {
  const projectName = c.req.param('project')
  if (!IsAllowedProject(projectName)) { return c.notFound() }

  const stats = await fetchStats(c.env.MY_KV_NAMESPACE, projectName)
  if (stats === null) { c.status(500); return c.body("Internal Server Error") }
  c.res.headers.set('Cache-Control', successfulCacheControl)
  return c.html(PageHTML({ projectName: 'sotsuron', progressStats: PageStatsToProgressStats(stats) }))
})

app.get(":project/json", async (c) => {
  const projectName = c.req.param('project')
  if (!IsAllowedProject(projectName)) { return c.notFound() }

  const rawStats = await fetchStats(c.env.MY_KV_NAMESPACE, projectName)
  if (rawStats === null) { c.status(500); return c.json({ status: "internalServererror" }) }

  c.res.headers.set('Cache-Control', successfulCacheControl)
  return c.json(PageStatsToProgressStats(rawStats))
})

export default app
