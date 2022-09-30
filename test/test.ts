import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles, preloadObject } from "../src/";

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: async (eventName: string) => await Promise.resolve(eventName),
};

let handleStore: {
  [key: string]: any;
};

describe("preloadObject to handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [eventName, handler])
    );
  });

  it("electronade-filestore:get", async () => {
    assert(
      // eslint-disable-next-line no-eval
      (await eval(preloadObject.filestore.get.toString())(
        "dummyFilePath",
        "dummyId"
      )) in handleStore
    );
  });

  it("electronade-filestore:getids", async () => {
    assert(
      // eslint-disable-next-line no-eval
      (await eval(preloadObject.filestore.getIds.toString())(
        "dummyFilePath"
      )) in handleStore
    );
  });

  it("electronade-filestore:save", async () => {
    assert(
      // eslint-disable-next-line no-eval
      (await eval(preloadObject.filestore.save.toString())(
        "dummyFilePath",
        {}
      )) in handleStore
    );
  });

  it("electronade-filestore:remove", async () => {
    assert(
      // eslint-disable-next-line no-eval
      (await eval(preloadObject.filestore.remove.toString())(
        "dummyFilePath",
        "dummyId"
      )) in handleStore
    );
  });
});
