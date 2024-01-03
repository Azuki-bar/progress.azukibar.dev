import { Hono } from 'hono'
import { fetchJson } from './fetchJson'
import { PageHTML } from './templates/pages'

type EnvBindings = {
  MY_KV_NAMESPACE: KVNamespace
  USERNAME: string
  PASSWORD: string
}
type ProgressStats = {
  pagesCount: number
  referencesCount: number
}
const app = new Hono<{ Bindings: EnvBindings }>()

app.get('/', (c) => {
  return c.redirect("/sotsuron")
})

app.get(":name", async (c) => {
  const name = c.req.param('name')
  if (name !== "sotsuron") { return c.notFound() }

  const stats = await fetchJson<ProgressStats>(c.env.MY_KV_NAMESPACE)
  return c.html(PageHTML({ pagesCount: stats.pagesCount }))
})

app.get(":name/json", (c) => {
  const name = c.req.param('name')
  if (name !== "sotsuron") { return c.notFound() }
  const stats = fetchJson<ProgressStats>(c.env.MY_KV_NAMESPACE)
  return c.json(stats)
})

export default app
