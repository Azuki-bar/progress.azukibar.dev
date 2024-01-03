import { AllowedProject } from "."

export type PageStats = {
  page: number
}

export const fetchStats = async (kv: KVNamespace, name: AllowedProject): Promise<PageStats|null> => {
  const l = await kv.list()
  console.log(l.keys)
  return await kv.get<PageStats>(name, 'json')
}