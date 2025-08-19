import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';
import { plainToInstance } from 'class-transformer';
import { IsString  } from 'class-validator';


import UserSettings from '@models/UserSettings';


import User from '@models/User';


class UserSettingsFieldsDefault {
    public user: string  | User = "";
    public lang: string  = "";
    public country: string  = "";
    public email_notifications: string  = "";
    public email_notifications_unsubscribetoken: string  = "";
    public cookies_accepted: string  = "";
    public task: string  = "";
}


export default class GeneratedUserSettings extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_settings";

    /**
     * Название контроллера
     */
    public static controllerName: string = "user-settings";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['user'];

    /**
     * Поля
     */

    public user!: number & User
    public lang!: string | null 
    public country!: string | null 
    public email_notifications!: number | null 
    public email_notifications_unsubscribetoken!: string | null 
    public cookies_accepted!: number | null 
    public task!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new UserSettingsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , cookies_accepted?: number , task?: string  } | number | string, fields: {user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , cookies_accepted?: number , task?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<UserSettings | null> {
        const result = await REST.one<UserSettings>(this.controllerName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
        return result === null ? null : plainToInstance(UserSettings, result);
    }

    /**
     * Загрузить список строк
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , cookies_accepted?: number , task?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"user"|"-user"|"lang"|"-lang"|"country"|"-country"|"email_notifications"|"-email_notifications"|"email_notifications_unsubscribetoken"|"-email_notifications_unsubscribetoken"|"cookies_accepted"|"-cookies_accepted"|"task"|"-task">, page?: number, perPage?: number, tree?: number }): Promise<Rows<UserSettings>> {
        const result = await REST.all<UserSettings>(this.controllerName, params);
        if (result.data)
            for (let i = 0; i < result.data.length; i++)
                result.data[i] = plainToInstance(UserSettings, result.data[i]);
        return result;
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {user?: number, lang?: string, country?: string, email_notifications?: number, email_notifications_unsubscribetoken?: string, cookies_accepted?: number, task?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<UserSettings>> {
        const result = await REST.create<UserSettings>(GeneratedUserSettings.controllerName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , cookies_accepted?: number , task?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserSettings>> {
        const result = await REST.create<UserSettings>(GeneratedUserSettings.controllerName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new UserSettings(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<UserSettings>> {
        const resp = await REST.edit<UserSettings>(GeneratedUserSettings.controllerName, (this as any)[GeneratedUserSettings.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {user?: number, lang?: string, country?: string, email_notifications?: number, email_notifications_unsubscribetoken?: string, cookies_accepted?: number, task?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserSettings>> {
        return REST.edit<UserSettings>(GeneratedUserSettings.controllerName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<UserSettings>> {
        if (GeneratedUserSettings.primaryKeys.length !== GeneratedUserSettings.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserSettings|null = null, values: { user?: number, lang?: string, country?: string, email_notifications?: number, email_notifications_unsubscribetoken?: string, cookies_accepted?: number, task?: string }): Promise<SavedObject<UserSettings>> {
        if (obj === null || GeneratedUserSettings.primaryKeys.length !== GeneratedUserSettings.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserSettings.edit((obj as any)[GeneratedUserSettings.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserSettings.controllerName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserSettings.controllerName, (this as any)[GeneratedUserSettings.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}