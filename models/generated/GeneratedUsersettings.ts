import REST, { Rows, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import Usersettings from '@models/Usersettings';


import User from '@models/User';


class user_settingsFieldsDefault {
    public user: string  | User = "";
    public lang: string  = "";
    public country: string  = "";
    public email_notifications: string  = "";
    public email_notifications_unsubscribetoken: string  = "";
    public push_notifications_token: string  = "";
    public cookies_accepted: string  = "";
    public medit_time: string  = "";
    public profile_bio: string  = "";
    public profile_instagram: string  = "";
    public profile_telegram: string  = "";
    public getcourse_email: string  = "";
}


export default class GeneratedUsersettings extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_settings";

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
    public push_notifications_token!: string | null 
    public cookies_accepted!: number | null 
    public medit_time!: any | null 
    public profile_bio!: string | null 
    public profile_instagram!: string | null 
    public profile_telegram!: string | null 
    public getcourse_email!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new user_settingsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , push_notifications_token?: string , cookies_accepted?: number , medit_time?: any , profile_bio?: string , profile_instagram?: string , profile_telegram?: string , getcourse_email?: string  } | number | string, fields: {user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , push_notifications_token?: string , cookies_accepted?: number , medit_time?: any , profile_bio?: string , profile_instagram?: string , profile_telegram?: string , getcourse_email?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<Usersettings|null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , push_notifications_token?: string , cookies_accepted?: number , medit_time?: any , profile_bio?: string , profile_instagram?: string , profile_telegram?: string , getcourse_email?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"user"|"-user"|"lang"|"-lang"|"country"|"-country"|"email_notifications"|"-email_notifications"|"email_notifications_unsubscribetoken"|"-email_notifications_unsubscribetoken"|"push_notifications_token"|"-push_notifications_token"|"cookies_accepted"|"-cookies_accepted"|"medit_time"|"-medit_time"|"profile_bio"|"-profile_bio"|"profile_instagram"|"-profile_instagram"|"profile_telegram"|"-profile_telegram"|"getcourse_email"|"-getcourse_email">, page?: number, perPage?: number, tree?: number }): Promise<Rows<Usersettings>> {
        return REST.all<Usersettings>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {user?: number, lang?: string, country?: string, email_notifications?: number, email_notifications_unsubscribetoken?: string, push_notifications_token?: string, cookies_accepted?: number, medit_time?: any, profile_bio?: string, profile_instagram?: string, profile_telegram?: string, getcourse_email?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<Usersettings>> {
        const result = await REST.create<Usersettings>(Usersettings.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {user?: number  | User, lang?: string , country?: string , email_notifications?: number , email_notifications_unsubscribetoken?: string , push_notifications_token?: string , cookies_accepted?: number , medit_time?: any , profile_bio?: string , profile_instagram?: string , profile_telegram?: string , getcourse_email?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Usersettings>> {
        const result = await REST.create<Usersettings>(Usersettings.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new Usersettings(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<Usersettings>> {
        const resp = await REST.edit<Usersettings>(Usersettings.tableName, (this as any)[Usersettings.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {user?: number, lang?: string, country?: string, email_notifications?: number, email_notifications_unsubscribetoken?: string, push_notifications_token?: string, cookies_accepted?: number, medit_time?: any, profile_bio?: string, profile_instagram?: string, profile_telegram?: string, getcourse_email?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Usersettings>> {
        return REST.edit<Usersettings>(Usersettings.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<Usersettings>> {
        if (GeneratedUsersettings.primaryKeys.length !== GeneratedUsersettings.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUsersettings|null = null, values: { user?: number, lang?: string, country?: string, email_notifications?: number, email_notifications_unsubscribetoken?: string, push_notifications_token?: string, cookies_accepted?: number, medit_time?: any, profile_bio?: string, profile_instagram?: string, profile_telegram?: string, getcourse_email?: string }): Promise<SavedObject<Usersettings>> {
        if (obj === null || GeneratedUsersettings.primaryKeys.length !== GeneratedUsersettings.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUsersettings.edit((obj as any)[GeneratedUsersettings.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(Usersettings.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(Usersettings.tableName, (this as any)[Usersettings.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}