import { AllowedProject } from "."

export type PageStats = {
  page: number
  // unix timeで保存される
  lastUpdatedAt: number
}

export const fetchStats = async (kv: KVNamespace, name: AllowedProject): Promise<PageStats|null> => {
  return kv.get<PageStats>(name, 'json')
}