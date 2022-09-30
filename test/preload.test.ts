import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: async (eventName: string, ...args: any[]) =>
    await Promise.resolve({ eventName, args }),
};

describe("preloadObject", () => {
  it("preloadObject.filestore exists", () => {
    assert(preloadObject.filestore);
  });

  it("preloadObject.filestore.get exists", () => {
    assert(preloadObject.filestore.get);
  });

  it("preloadObject.filestore.get calling", async () => {
    const mocked = mock(ipcRenderer);
    const [filePath, id, mockedValue] = [
      "filePath",
      "id",
      { _id: "id", name: "test" },
    ];

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-filestore:get", { filePath, id })
      .returns(Promise.resolve(mockedValue));
    assert.equal(
      // eslint-disable-next-line no-eval
      await eval(preloadObject.filestore.get.toString())(filePath, id).then(
        (result: any) => JSON.stringify(result)
      ),
      JSON.stringify(mockedValue)
    );
    mocked.verify();
    mocked.restore();
  });

  it("preloadObject.filestore.getIds exists", () => {
    assert(preloadObject.filestore.getIds);
  });

  it("preloadObject.filestore.getIds calling", async () => {
    const mocked = mock(ipcRenderer);
    const [filePath, mockedValue] = ["filePath", ["mocked value"]];

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-filestore:getids", { filePath })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      // eslint-disable-next-line no-eval
      await eval(preloadObject.filestore.getIds.toString())(filePath).then(
        (result: any) => JSON.stringify(result)
      ),
      JSON.stringify(mockedValue)
    );

    mocked.verify();
    mocked.restore();
  });

  it("preloadObject.filestore.save exists", () => {
    assert(preloadObject.filestore.save);
  });

  it("preloadObject.filestore.save calling", async () => {
    const mocked = mock(ipcRenderer);
    const [filePath, item, mockedValue] = [
      "filePath",
      { _id: "id", name: "test" },
      { _id: "id", name: "test" },
    ];

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-filestore:save", { filePath, item })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      // eslint-disable-next-line no-eval
      await eval(preloadObject.filestore.save.toString())(filePath, item).then(
        (result: any) => JSON.stringify(result)
      ),
      JSON.stringify(mockedValue)
    );
    mocked.verify();
    mocked.restore();
  });

  it("preloadObject.filestore.remove exists", () => {
    assert(preloadObject.filestore.remove);
  });

  it("preloadObject.filestore.remove calling", async () => {
    const mocked = mock(ipcRenderer);
    const [filePath, id] = ["filePath", "id"];

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-filestore:remove", { filePath, id })
      .returns(Promise.resolve(undefined));

    assert.equal(
      // eslint-disable-next-line no-eval
      await eval(preloadObject.filestore.remove.toString())(filePath, id),
      undefined
    );

    mocked.verify();
    mocked.restore();
  });
});
