import { storeFile } from '@/store';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { Capacitor } from '@capacitor/core';
import { Directory, DownloadFileResult, Encoding, Filesystem } from '@capacitor/filesystem';

export default class Files {


   public static async SaveAndOpenFile(data: Blob, filename: string, mime: string, folder = Directory.Documents, isOpen: boolean = true) {
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

            const filepath = await this.SaveFileAndGetPath(filename, data, folder);

            if (isOpen)
               this.openFileWithType(filepath, mime);


            return filepath;
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

      let result: boolean = false;

      console.log("start open the file");
      await FileOpener.open(fileOpenerOptions)
         .then(() => {
            console.log("File is opened");
            result = true;
         })
         .catch((error) => {
            console.error(error)
            window.alert('Ошибка загрузки файла: ' + error.message)
            result = false;
         })

      return result;
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


   /**************** СКАЧИВАНИЕ ФАЙЛОВ В КЕШ ЧЕРЕЗ ЗАГРУЗЧИК */
   public downloadPool: Array<string> = [];
   public CachedFiles: Array<CacheFileInfo> = [];

   public async UpdateFilesInCache() {

      // TODO: ВРЕМЕННО ОБНУЛЯЕМ
      // localStorage.removeItem("cachedFiles")


      this.UpdateCacheVar();

      const store = storeFile();

      // загрузка ещё выполняется
      const taskRunned = this.CachedFiles.find(r => (r.status === 'loading' || r.status === 'new') && (r.lastDownloadStart === null || (r.lastDownloadStart as any - (new Date as any) < 30 * 60 * 1000)))
      if (taskRunned === undefined) return;

      for (const file of this.CachedFiles) {
         // загруженные пропускаем
         if (file.status === 'loaded') continue;



         // все остальные грузим [условия пройдены были выше]
         file.lastDownloadStart = new Date();
         file.status = 'loading';
         localStorage.setItem("cachedFiles", JSON.stringify(this.CachedFiles))

         try {

            //Filesystem.checkPermissions()

            console.log("START DOWNLOAD " + file.url);

            await Filesystem.checkPermissions();

            await Filesystem.requestPermissions();


            let storage: Directory;
            switch (store.platform) {
               case 'android':
                  storage = Directory.External;
                  break;
               case 'ios':
               default:
                  storage = Directory.Data;
                  break;
            }

            let downloadFile: DownloadFileResult
            try {

               downloadFile = await Filesystem.downloadFile({
                  url: (window as any).REST.SERVER + "/" + file.url,
                  path: file.filename,
                  directory: storage,
                  recursive: true,
               })
            }
            catch (ex1) {
               console.log(JSON.stringify(ex1));
               console.log("ОШИБКА СКАЧКИ");
               return;
            }

            console.log("DOWNLOADED PATH: " + downloadFile.path);

            if (downloadFile.path !== undefined) {

               file.status = 'loaded';
               file.lastDownloaded = new Date();
               file.fileCacheUri = downloadFile.path;
               localStorage.setItem("cachedFiles", JSON.stringify(this.CachedFiles))

               console.log(JSON.stringify(this.CachedFiles));

               // Установить шкалу прогресса скачки
               store.notifications.download.status = 'downloaded';
               //const findedMedit = store.Meditations.find(meditX => meditX.files[0].file === file.url);
               //if (findedMedit)
               //   findedMedit.downloadStatus = 'downloaded';

            }
         } catch (error) {
            console.error('Ошибка загрузки файла:', error);
         }

      }
   }

   public async UpdateCacheVar() {
      const cached = localStorage.getItem("cachedFiles");
      if (cached) {
         this.CachedFiles = JSON.parse(cached) as any
         for (const item of this.CachedFiles) {
            if (typeof item.lastDownloadStart === 'string') {
               item.lastDownloadStart = new Date(item.lastDownloadStart);
            }
            if (typeof item.lastDownloaded === 'string') {
               item.lastDownloadStart = new Date(item.lastDownloaded);
            }
         }
      }
      else {
         this.CachedFiles = [];
         localStorage.setItem("cachedFiles", JSON.stringify(this.CachedFiles))
      }
   }

   public async DownloadFileToCache(url: string) {

      this.UpdateCacheVar();

      const store = storeFile();

      // Добавляем файл в пул задач
      if (this.CachedFiles.find(r => r.url === url) === undefined) {
         const newFile = new CacheFileInfo;
         newFile.url = url;
         const splittedURL = (url.split('/'));
         newFile.filename = (splittedURL[splittedURL.length - 1]);
         newFile.status = "new";
         this.CachedFiles.push(newFile);
         localStorage.setItem("cachedFiles", JSON.stringify(this.CachedFiles))

         // Установить шкалу прогресса скачки
         store.notifications.download.status = 'process';
         //const findedMedit = store.Meditations.find(meditX => meditX.files[0].file === url);
         //if (findedMedit)
         //   findedMedit.downloadStatus = 'process';

         this.UpdateFilesInCache();
      }


   }

   /**
    * Получить файл из кеша
    * @param url 
    * @returns 
    */
   public async getFileURLFromCache(url: string) {
      this.UpdateCacheVar();

      let storage: Directory;
      switch (storeFile().platform) {
         case 'android':
            storage = Directory.External;
            break;
         case 'ios':
         default:
            storage = Directory.Data;
            break;
      }

      for (const item of this.CachedFiles) {
         if (item.url === url && item.status === 'loaded') {
            const uri = await Filesystem.getUri({ path: item.filename, directory: storage });
            return Capacitor.convertFileSrc(uri.uri);
         }
      }
      return null;
   }


   public async downloadFile(file: any, isOpen: boolean = false, mimeType: string = "") {

      let storage: Directory;
      switch (storeFile().platform) {
         case 'android':
            storage = Directory.External;
            break;
         case 'ios':
         default:
            storage = Directory.Data;
            break;
      }

      let dFile: DownloadFileResult
      try {

         dFile = await Filesystem.downloadFile({
            url: file.url,
            path: file.name,
            directory: storage,
            recursive: true,
         })
         if (dFile.path && storeFile().platform !== 'web')
            await Files.openFileWithType(dFile.path, file?.mime ?? mimeType);
      }
      catch (ex1: any) {
         console.log(JSON.stringify(ex1));
         console.log("ОШИБКА СКАЧКИ");
         alert(ex1.message + JSON.stringify(file));
         return;
      }

   }

}

export class CacheFileInfo {

   public url: string = "";
   public filename: string = "";
   public fileCacheUri: string = "";
   public lastDownloaded: Date | null = null;
   public lastDownloadStart: Date | null = null;
   public status: "new" | "loading" | "loaded" = "new";

}