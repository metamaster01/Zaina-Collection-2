type Entry = { at: number; ttl: number; payload: any };
const store = new Map<string, Entry>();

export function getCache<T = any>(key: string): T | null {
  const e = store.get(key);
  if (!e) return null;
  if (Date.now() - e.at > e.ttl) { store.delete(key); return null; }
  return e.payload as T;
}

export function setCache(key: string, payload: any, ttlMs: number) {
  store.set(key, { at: Date.now(), ttl: ttlMs, payload });
}

export function delCache(key: string) {
  store.delete(key);
}
