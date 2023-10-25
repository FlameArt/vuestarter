import REST, { Rows, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import Userorders from '@models/Userorders';


import User from '@models/User';
import Subscribtions from '@models/Subscribtions';


class user_ordersFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public affiliate: string  = "";
    public subscription: string  | Subscribtions = "";
    public total: string  = "";
    public data: string  = "";
    public paymethod: string  = "";
    public paysystem: string  = "";
    public paystatus: string  = "";
    public transaction_id: string  = "";
    public transaction_data: string  = "";
    public status: string  = "";
    public created_dt: string  = "";
    public updated_dt: string  = "";
}


export default class GeneratedUserorders extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_orders";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public user!: number & User | null 
    public affiliate!: number | null 
    public subscription!: number & Subscribtions | null 
    public total!: number
    public data!: any | null 
    public paymethod!: string | null 
    public paysystem!: string | null 
    public paystatus!: string | null 
    public transaction_id!: string | null 
    public transaction_data!: any | null 
    public status!: string | null 
    public created_dt!: string | null 
    public updated_dt!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new user_ordersFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, affiliate?: number , subscription?: number  | Subscribtions, total?: number , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , transaction_id?: string , transaction_data?: any , status?: string , created_dt?: string , updated_dt?: string  } | number | string, fields: {id?: number , user?: number  | User, affiliate?: number , subscription?: number  | Subscribtions, total?: number , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , transaction_id?: string , transaction_data?: any , status?: string , created_dt?: string , updated_dt?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<Userorders|null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, affiliate?: number , subscription?: number  | Subscribtions, total?: number , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , transaction_id?: string , transaction_data?: any , status?: string , created_dt?: string , updated_dt?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"affiliate"|"-affiliate"|"subscription"|"-subscription"|"total"|"-total"|"data"|"-data"|"paymethod"|"-paymethod"|"paysystem"|"-paysystem"|"paystatus"|"-paystatus"|"transaction_id"|"-transaction_id"|"transaction_data"|"-transaction_data"|"status"|"-status"|"created_dt"|"-created_dt"|"updated_dt"|"-updated_dt">, page?: number, perPage?: number, tree?: number }): Promise<Rows<Userorders>> {
        return REST.all<Userorders>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, user?: number, affiliate?: number, subscription?: number, total?: number, data?: any, paymethod?: string, paysystem?: string, paystatus?: string, transaction_id?: string, transaction_data?: any, status?: string, created_dt?: string, updated_dt?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<Userorders>> {
        const result = await REST.create<Userorders>(Userorders.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, affiliate?: number , subscription?: number  | Subscribtions, total?: number , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , transaction_id?: string , transaction_data?: any , status?: string , created_dt?: string , updated_dt?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Userorders>> {
        const result = await REST.create<Userorders>(Userorders.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new Userorders(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<Userorders>> {
        const resp = await REST.edit<Userorders>(Userorders.tableName, (this as any)[Userorders.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, affiliate?: number, subscription?: number, total?: number, data?: any, paymethod?: string, paysystem?: string, paystatus?: string, transaction_id?: string, transaction_data?: any, status?: string, created_dt?: string, updated_dt?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Userorders>> {
        return REST.edit<Userorders>(Userorders.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<Userorders>> {
        if (GeneratedUserorders.primaryKeys.length !== GeneratedUserorders.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserorders|null = null, values: { id?: number, user?: number, affiliate?: number, subscription?: number, total?: number, data?: any, paymethod?: string, paysystem?: string, paystatus?: string, transaction_id?: string, transaction_data?: any, status?: string, created_dt?: string, updated_dt?: string }): Promise<SavedObject<Userorders>> {
        if (obj === null || GeneratedUserorders.primaryKeys.length !== GeneratedUserorders.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserorders.edit((obj as any)[GeneratedUserorders.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(Userorders.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(Userorders.tableName, (this as any)[Userorders.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}