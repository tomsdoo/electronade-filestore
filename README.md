# electronade-filestore

It's a package for electronade that provides the storing features in a file.

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
