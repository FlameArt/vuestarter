import { storeFile } from '@/store';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { Directory, Filesystem } from '@capacitor/filesystem';

export default class Files {

   public static async SaveAndOpenFile(data: Blob, filename: string, mime: string) {
      switch (storeFile().platform) {

         case 'web': {
            // Нативный загрузчик через браузер
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            break;
         }

         case 'ios':
         case 'android': {

            const filepath = await this.SaveFileAndGetPath(filename, data, Directory.Documents);
            this.openFileWithType(filepath, mime);

            break;
         }


         default:
            break;
      }

   }

   /**
    * Сохранить файл на устройстве
    * @param blob 
    * @param fileName 
    * @returns 
    */
   public static async saveFileMobile(blob: Blob, fileName: string, Directory: Directory) {

      const base64Data: string = await this.blobToBase64(blob);

      const res = await Filesystem.writeFile({
         path: fileName,
         data: base64Data,
         directory: Directory,
      });

      return res.uri;

   }

   private static blobToBase64(blob: Blob): Promise<string> {
      return new Promise((resolve, _) => {
         const reader = new FileReader();
         reader.onloadend = () => resolve(reader.result as any);
         reader.readAsDataURL(blob);
      });
   }


   /**
    * Открыть файл на устройстве
    * @param filePath 
    * @param fileType 
    */
   public static async openFileWithType(filePath: string, fileType: string) {
      const fileOpenerOptions: FileOpenerOptions = {
         filePath: filePath,
         contentType: fileType,
      }

      console.log("start open the file");
      await FileOpener.open(fileOpenerOptions)
         .then(() => {
            console.log("File is opened");
         })
         .catch((error) => {
            console.error(error)
         })
   }

   /**
    * 
    * @param fileName 
    * @param blob 
    * @returns 
    */
   public static async SaveFileAndGetPath(fileName: string, blob: Blob, Directory: Directory): Promise<string> {

      // Получить разрешение
      this.getFilesystemAccess();

      const name = fileName

      try {
         // 5. Save the file locally
         return await this.saveFileMobile(blob, name, Directory)
      } catch {
         // 6. In case the file did already exists -> we retrieve it
         await Filesystem.getUri({
            path: name,
            directory: Directory,
         })
            .then((savedFile) => {
               return savedFile.uri
            })
            .catch((error) => {
               console.error(error)
               throw new Error('Cannot save/open the file')
            })
      }
      console.error("CANT SAVE THE FILE");
      return "";
   }

   /**
    * Получить права на запись
    * @returns 
    */
   public static async getFilesystemAccess(): Promise<boolean> {
      const status = await Filesystem.checkPermissions()
      const state = status.publicStorage

      if (state === 'granted') {
         return true;
      } else if (state === 'denied') {
         // You make want to redirect to the main app settings.
      } else {
         Filesystem.requestPermissions()
      }
      return false;
   }


}