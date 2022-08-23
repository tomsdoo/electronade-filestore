import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles, preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName)
};

let handleStore: {
  [key: string]: any;
};

describe("preloadObject to handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) =>
        [eventName, handler ])
    );
  });

  it("electronade-filestore:get", async () => {
    assert(
      await eval(preloadObject.filestore.get.toString())
        ("dummyFilePath", "dummyId")
        in handleStore
    );
  });

  it("electronade-filestore:save", async () => {
    assert(
      await eval(preloadObject.filestore.save.toString())
        ("dummyFilePath", {})
        in handleStore
    );
  });

  it("electronade-filestore:remove", async () => {
    assert(
      await eval(preloadObject.filestore.remove.toString())
        ("dummyFilePath", "dummyId")
        in handleStore
    );
  });
});
