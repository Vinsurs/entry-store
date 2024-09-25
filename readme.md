# entry-store
A library for store search history entry data.

## Install
```bash
npm install entry-store
```

## Usage
```js
import { createEntryStore } from 'entry-store'

const entryStore = createEntryStore(key, (val1, val2) => val1 === val2, options)

```

## License
MIT
