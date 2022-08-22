import { FileDb } from "@tomsd/fsdb";
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-filestore:get",
    handler: (
      event: any,
      { filePath, id }: { filePath: string; id: string; }
    ) => new FileDb(filePath).get(id)
  },
  {
    eventName: "electronade-filestore:save",
    handler: (
      event: any,
      { filePath, item }: { filePath: string; item: object; }
    ) => new FileDb(filePath).save(item)
  },
  {
    eventName: "electronade-filestore:remove",
    handler: (
      event: any,
      { filePath, id }: { filePath: string; id: string; }
    ) => new FileDb(filePath).remove(id)
  }
];

export const preloadObject = {
  filestore: {
    get: (filePath: string, id: string) => ipcRenderer.invoke("electronade-filestore:get", { filePath, id }),
    save: (filePath: string, item: object) => ipcRenderer.invoke("electronade-filestore:save", { filePath, item }),
    remove: (filePath: string, id: string) => ipcRenderer.invoke("electronade-filestore:remove", { filePath, id })
  }
};
