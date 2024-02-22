import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import Userlogs from '@models/Userlogs';


import User from '@models/User';


class user_logsFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public type: string  = "";
    public txt: string  = "";
    public data: string  = "";
    public device: string  = "";
    public dt: string  = "";
}


export default class GeneratedUserlogs extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_logs";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public user!: number & User | null 
    public type!: string | null 
    public txt!: string | null 
    public data!: any | null 
    public device!: any | null 
    public dt!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new user_logsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string  } | number | string, fields: {id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<Userlogs | null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"type"|"-type"|"txt"|"-txt"|"data"|"-data"|"device"|"-device"|"dt"|"-dt">, page?: number, perPage?: number, tree?: number }): Promise<Rows<Userlogs>> {
        return REST.all<Userlogs>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, user?: number, type?: string, txt?: string, data?: any, device?: any, dt?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<Userlogs>> {
        const result = await REST.create<Userlogs>(Userlogs.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Userlogs>> {
        const result = await REST.create<Userlogs>(Userlogs.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new Userlogs(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<Userlogs>> {
        const resp = await REST.edit<Userlogs>(Userlogs.tableName, (this as any)[Userlogs.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, type?: string, txt?: string, data?: any, device?: any, dt?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Userlogs>> {
        return REST.edit<Userlogs>(Userlogs.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<Userlogs>> {
        if (GeneratedUserlogs.primaryKeys.length !== GeneratedUserlogs.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserlogs|null = null, values: { id?: number, user?: number, type?: string, txt?: string, data?: any, device?: any, dt?: string }): Promise<SavedObject<Userlogs>> {
        if (obj === null || GeneratedUserlogs.primaryKeys.length !== GeneratedUserlogs.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserlogs.edit((obj as any)[GeneratedUserlogs.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(Userlogs.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(Userlogs.tableName, (this as any)[Userlogs.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}