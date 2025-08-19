import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';
import { plainToInstance } from 'class-transformer';
import { IsString  } from 'class-validator';


import UserLogs from '@models/UserLogs';


import User from '@models/User';


class UserLogsFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public type: string  = "";
    public txt: string  = "";
    public data: string  = "";
    public device: string  = "";
    public dt: string  = "";
}


export default class GeneratedUserLogs extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_logs";

    /**
     * Название контроллера
     */
    public static controllerName: string = "user-logs";

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
    public static Fields = (assign: object = {}) => Object.assign(new UserLogsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string  } | number | string, fields: {id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<UserLogs | null> {
        const result = await REST.one<UserLogs>(this.controllerName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
        return result === null ? null : plainToInstance(UserLogs, result);
    }

    /**
     * Загрузить список строк
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"type"|"-type"|"txt"|"-txt"|"data"|"-data"|"device"|"-device"|"dt"|"-dt">, page?: number, perPage?: number, tree?: number }): Promise<Rows<UserLogs>> {
        const result = await REST.all<UserLogs>(this.controllerName, params);
        if (result.data)
            for (let i = 0; i < result.data.length; i++)
                result.data[i] = plainToInstance(UserLogs, result.data[i]);
        return result;
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
    public async create(): Promise<SavedObject<UserLogs>> {
        const result = await REST.create<UserLogs>(GeneratedUserLogs.controllerName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, type?: string , txt?: string , data?: any , device?: any , dt?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserLogs>> {
        const result = await REST.create<UserLogs>(GeneratedUserLogs.controllerName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new UserLogs(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<UserLogs>> {
        const resp = await REST.edit<UserLogs>(GeneratedUserLogs.controllerName, (this as any)[GeneratedUserLogs.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, type?: string, txt?: string, data?: any, device?: any, dt?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserLogs>> {
        return REST.edit<UserLogs>(GeneratedUserLogs.controllerName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<UserLogs>> {
        if (GeneratedUserLogs.primaryKeys.length !== GeneratedUserLogs.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserLogs|null = null, values: { id?: number, user?: number, type?: string, txt?: string, data?: any, device?: any, dt?: string }): Promise<SavedObject<UserLogs>> {
        if (obj === null || GeneratedUserLogs.primaryKeys.length !== GeneratedUserLogs.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserLogs.edit((obj as any)[GeneratedUserLogs.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserLogs.controllerName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserLogs.controllerName, (this as any)[GeneratedUserLogs.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}