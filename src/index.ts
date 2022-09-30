import { FileDb } from "@tomsd/fsdb";
// eslint-disable-next-line  @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-filestore:get",
    handler: async (event: any, { filePath, id }: { filePath: string; id: string }) =>
      await new FileDb(filePath).get(id),
  },
  {
    eventName: "electronade-filestore:getids",
    handler: async (event: any, { filePath }: { filePath: string }) =>
      await new FileDb(filePath).getIds(),
  },
  {
    eventName: "electronade-filestore:save",
    handler: async (
      event: any,
      { filePath, item }: { filePath: string; item: object }
    ) => await new FileDb(filePath).save(item),
  },
  {
    eventName: "electronade-filestore:remove",
    handler: async (event: any, { filePath, id }: { filePath: string; id: string }) =>
      await new FileDb(filePath).remove(id),
  },
];

export const preloadObject = {
  filestore: {
    get: async (filePath: string, id: string) =>
      await ipcRenderer.invoke("electronade-filestore:get", { filePath, id }),
    getIds: async (filePath: string) =>
      await ipcRenderer.invoke("electronade-filestore:getids", { filePath }),
    save: async (filePath: string, item: object) =>
      await ipcRenderer.invoke("electronade-filestore:save", { filePath, item }),
    remove: async (filePath: string, id: string) =>
      await ipcRenderer.invoke("electronade-filestore:remove", { filePath, id }),
  },
};
