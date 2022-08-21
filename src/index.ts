import { FileDb } from "@tomsd/fsdb";
import { ipcRenderer } from "electron";

export const handles = [
  {
    eventName: "electronade-filestore:get",
    handler: (
      eventName: string,
      { filePath, id }: { filePath: string; id: string; }
    ) => new FileDb(filePath).get(id)
  },
  {
    eventName: "electronade-filestore.save",
    handler: (
      eventName: string,
      { filePath, obj }: { filePath: string; obj: object; }
    ) => new FileDb(filePath).save(obj)
  },
  {
    eventName: "electronade-filestore:remove",
    handler: (
      eventName: string,
      { filePath, id }: { filePath: string; id: string; }
    ) => new FileDb(filePath).remove(id)
  }
];

export const preloadObject = {
  filestore: {
    get: (filePath: string, id: string) => ipcRenderer.invoke("electronade-filestore:get", { filePath, id }),
    save: (filePath: string, obj: object) => ipcRenderer.invoke("electronade-filestore:save", { filePath, obj }),
    remove: (filePath: string, id: string) => ipcRenderer.invoke("electronade-filestore:remove", { filePath, id })
  }
};
