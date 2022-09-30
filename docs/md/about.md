# electronade-filestore

It's a package for [electronade](https://electronade.netlify.app) that provides the storing features in a file.

## installation

``` shell
npm install electronade-filestore
```

## interfaces

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

## usage
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
