# electronade-filestore

It's a package for [electronade](https://electronade.netlify.app) that provides the storing features in a file.

![npm](https://img.shields.io/npm/v/electronade-filestore)
![NPM](https://img.shields.io/npm/l/electronade-filestore)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/electronade-filestore)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/electronade-filestore)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

[![](https://nodei.co/npm/electronade-filestore.svg?mini=true)](https://www.npmjs.com/package/electronade-filestore)

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
