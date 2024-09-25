import { createNaiveStorage, type NaiveStorageOptions, type NaiveStorageInstance } from "naive-storage"

type DeDuplicate<S> = (entry1: S, entry2: S) => boolean

export type EntryStoreInstance<S> = InstanceType<typeof EntryStore<S>>
/**
 * @class EntryStore
 */
class EntryStore<S = string> {
  ls: NaiveStorageInstance<S[]>
  deDuplicate: DeDuplicate<S>
  key: string
  maxCount: number
  constructor(key: string, deDuplicate: DeDuplicate<S>, storageOptions?: NaiveStorageOptions, maxCount = Infinity) {
    this.key = key
    this.maxCount = maxCount
    this.ls = createNaiveStorage<S[]>(storageOptions)
    this.deDuplicate = deDuplicate
  }
  get() {
    return this.ls.get(this.key, [])
  }

  set(entries: S[]): S[] {
    const newEntries = Array.from(new Set(entries)).slice(0, this.maxCount)
    this.ls.set(this.key, newEntries)
    return newEntries
  }

  clear() {
    this.ls.del(this.key)
  }

  push(entry: S): S[] {
    const entries = this.get()
    const index = entries.findIndex(l => this.deDuplicate(l, entry))
    if (~index) {
      entries.splice(index, 1)
    }
    entries.unshift(entry)
    const newEntries = entries.slice(0, this.maxCount)
    this.set(newEntries)
    return newEntries
  }
}

export function createEntryStore<S = string>(key: string, deDuplicate: DeDuplicate<S>, storageOptions?: NaiveStorageOptions, maxCount?: number) {
  return new EntryStore<S>(key, deDuplicate, storageOptions, maxCount)
}