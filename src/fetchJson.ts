export const fetchJson = async <T>(kvNs: KVNamespace): Promise<Awaited<T>> => {
  const json = await kvNs.get('data', 'json') as string
  return JSON.parse(json) satisfies T
}