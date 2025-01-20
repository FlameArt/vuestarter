import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import Userevents from '@models/Userevents';


import User from '@models/User';


class user_eventsFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public type: string  = "";
    public name: string  = "";
    public dt: string  = "";
    public data: string  = "";
    public platform: string  = "";
}


export default class GeneratedUserevents extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_events";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public user!: number & User
    public type!: number
    public name!: string | null 
    public dt!: string
    public data!: any | null 
    public platform!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new user_eventsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string  } | number | string, fields: {id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<Userevents | null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"type"|"-type"|"name"|"-name"|"dt"|"-dt"|"data"|"-data"|"platform"|"-platform">, page?: number, perPage?: number, tree?: number }): Promise<Rows<Userevents>> {
        return REST.all<Userevents>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, user?: number, type?: number, name?: string, dt?: string, data?: any, platform?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<Userevents>> {
        const result = await REST.create<Userevents>(Userevents.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Userevents>> {
        const result = await REST.create<Userevents>(Userevents.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new Userevents(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<Userevents>> {
        const resp = await REST.edit<Userevents>(Userevents.tableName, (this as any)[Userevents.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, type?: number, name?: string, dt?: string, data?: any, platform?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Userevents>> {
        return REST.edit<Userevents>(Userevents.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<Userevents>> {
        if (GeneratedUserevents.primaryKeys.length !== GeneratedUserevents.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserevents|null = null, values: { id?: number, user?: number, type?: number, name?: string, dt?: string, data?: any, platform?: string }): Promise<SavedObject<Userevents>> {
        if (obj === null || GeneratedUserevents.primaryKeys.length !== GeneratedUserevents.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserevents.edit((obj as any)[GeneratedUserevents.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(Userevents.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(Userevents.tableName, (this as any)[Userevents.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}