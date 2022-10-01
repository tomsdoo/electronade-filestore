# electronade-filestore

It's a package for electronade that provides the storing features in a file.  
See [electronade-filestore.netlify.app](https://electronade-filestore.netlify.app/) also.

![npm](https://img.shields.io/npm/v/electronade-filestore)
![NPM](https://img.shields.io/npm/l/electronade-filestore)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/electronade-filestore)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/electronade-filestore)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

# Installation
``` shell
npm install electronade-filestore
```

# What Exposed
``` typescript
electronade: {
  filestore: {
    get: (
      filePath: string,
      id: string
    ) => Promise<object | undefined>;

    getIds: (
      filePath: string
    ) => Promise<string[]>;

    save: (
      filePath: string,
      item: object
    ) => Promise<object>;

    remove: (
      filePath: string,
      id: string
    ) => Promise<undefined>;
  }
}
```

# Usage
See electronade usage for details.

``` javascript
const filePath = "/Users/xxx/Documents/testFilePath";

const item = await electronade.filestore
  .save(filePath, { message: "hi" });

assert.equal(
  item.message,
  "hi"
);

assert(
  await electronade.filestore
    .getIds(filePath)
    .then(ids => ids.includes(item._id))
);

assert(
  await electronade.filestore
    .get(filePath, item._id)
    .then(({ message }) => message),
  "hi"
);

await electronade.filestore
  .remove(filePath, item._id);

assert.equal(
  await electronade.filestore
    .get(filePath, item._id),
  undefined
);

```
