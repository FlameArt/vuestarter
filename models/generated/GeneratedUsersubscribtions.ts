import REST, { Rows, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import Usersubscribtions from '@models/Usersubscribtions';


import User from '@models/User';
import Subscribtions from '@models/Subscribtions';


class user_subscribtionsFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public subscription: string  | Subscribtions = "";
    public started_dt: string  = "";
    public payedto_dt: string  = "";
    public status: string  = "";
}


export default class GeneratedUsersubscribtions extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_subscribtions";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public user!: number & User
    public subscription!: number & Subscribtions
    public started_dt!: string | null 
    public payedto_dt!: string | null 
    public status!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new user_subscribtionsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, subscription?: number  | Subscribtions, started_dt?: string , payedto_dt?: string , status?: string  } | number | string, fields: {id?: number , user?: number  | User, subscription?: number  | Subscribtions, started_dt?: string , payedto_dt?: string , status?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<Usersubscribtions|null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, subscription?: number  | Subscribtions, started_dt?: string , payedto_dt?: string , status?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"subscription"|"-subscription"|"started_dt"|"-started_dt"|"payedto_dt"|"-payedto_dt"|"status"|"-status">, page?: number, perPage?: number, tree?: number }): Promise<Rows<Usersubscribtions>> {
        return REST.all<Usersubscribtions>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, user?: number, subscription?: number, started_dt?: string, payedto_dt?: string, status?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<Usersubscribtions>> {
        const result = await REST.create<Usersubscribtions>(Usersubscribtions.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, subscription?: number  | Subscribtions, started_dt?: string , payedto_dt?: string , status?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Usersubscribtions>> {
        const result = await REST.create<Usersubscribtions>(Usersubscribtions.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new Usersubscribtions(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<Usersubscribtions>> {
        const resp = await REST.edit<Usersubscribtions>(Usersubscribtions.tableName, (this as any)[Usersubscribtions.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, subscription?: number, started_dt?: string, payedto_dt?: string, status?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Usersubscribtions>> {
        return REST.edit<Usersubscribtions>(Usersubscribtions.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<Usersubscribtions>> {
        if (GeneratedUsersubscribtions.primaryKeys.length !== GeneratedUsersubscribtions.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUsersubscribtions|null = null, values: { id?: number, user?: number, subscription?: number, started_dt?: string, payedto_dt?: string, status?: string }): Promise<SavedObject<Usersubscribtions>> {
        if (obj === null || GeneratedUsersubscribtions.primaryKeys.length !== GeneratedUsersubscribtions.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUsersubscribtions.edit((obj as any)[GeneratedUsersubscribtions.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(Usersubscribtions.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(Usersubscribtions.tableName, (this as any)[Usersubscribtions.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}