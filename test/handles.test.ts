import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles } from "../src/";

import { FileDb } from "@tomsd/fsdb";
import { join } from "path";
import { tmpdir } from "os";
import { randomBytes } from "crypto";

let filePath: string;
let store: FileDb;
let testId: string;

const handleStore = Object.fromEntries(
  handles.map(({ eventName, handler }) => [eventName, handler])
);

describe("handles", () => {
  before(() => {
    filePath = join(
      tmpdir(),
      randomBytes(12)
        .toString("base64")
        .replace(/[^A-Za-z0-9]/g, "a")
    );

    store = new FileDb(filePath);

    testId = randomBytes(12)
      .toString("base64")
      .replace(/[^A-Za-z0-9]/g, "a");
  });

  after(async () => {
    await store.drop();
  });

  it("electronade-filestore:save eventName exists", () => {
    assert("electronade-filestore:save" in handleStore);
  });

  it("electronade-filestore:save handler", async () => {
    assert.equal(
      await handleStore["electronade-filestore:save"](
        {},
        // @ts-expect-error
        {
          filePath,
          item: {
            _id: testId,
            name: "test name",
          },
        }
      ).then(({ _id }) => _id),
      testId
    );
  });

  it("electronade-filestore:getids eventName exists", () => {
    assert("electronade-filestore:getids" in handleStore);
  });

  it("electronade-filestore:getids handler", async () => {
    assert.equal(
      await handleStore["electronade-filestore:getids"](
        {},
        // @ts-expect-error
        {
          filePath,
        }
      ).then((ids) => JSON.stringify(ids)),
      JSON.stringify([testId])
    );
  });

  it("electronade-filestore:get eventName exists", () => {
    assert("electronade-filestore:get" in handleStore);
  });

  it("electronade-filestore:get handler", async () => {
    assert.equal(
      await handleStore["electronade-filestore:get"](
        {},
        // @ts-expect-error
        {
          filePath,
          id: testId,
        }
      ).then(({ _id }) => _id),
      testId
    );
  });

  it("electronade-filestore:remove eventName exists", () => {
    assert("electronade-filestore:remove" in handleStore);
  });

  it("electronade-filestore:remove handler", async () => {
    assert.equal(
      await handleStore["electronade-filestore:remove"](
        {},
        // @ts-expect-error
        {
          filePath,
          id: testId,
        }
      ),
      undefined
    );
  });
});
