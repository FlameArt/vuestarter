import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';
import { plainToInstance } from 'class-transformer';
import { IsString  } from 'class-validator';


import UserEvents from '@models/UserEvents';


import User from '@models/User';


class UserEventsFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public type: string  = "";
    public name: string  = "";
    public dt: string  = "";
    public data: string  = "";
    public platform: string  = "";
}


export default class GeneratedUserEvents extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_events";

    /**
     * Название контроллера
     */
    public static controllerName: string = "user-events";

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
    public static Fields = (assign: object = {}) => Object.assign(new UserEventsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string  } | number | string, fields: {id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<UserEvents | null> {
        const result = await REST.one<UserEvents>(this.controllerName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
        return result === null ? null : plainToInstance(UserEvents, result);
    }

    /**
     * Загрузить список строк
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"type"|"-type"|"name"|"-name"|"dt"|"-dt"|"data"|"-data"|"platform"|"-platform">, page?: number, perPage?: number, tree?: number }): Promise<Rows<UserEvents>> {
        const result = await REST.all<UserEvents>(this.controllerName, params);
        if (result.data)
            for (let i = 0; i < result.data.length; i++)
                result.data[i] = plainToInstance(UserEvents, result.data[i]);
        return result;
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
    public async create(): Promise<SavedObject<UserEvents>> {
        const result = await REST.create<UserEvents>(GeneratedUserEvents.controllerName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, type?: number , name?: string , dt?: string , data?: any , platform?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserEvents>> {
        const result = await REST.create<UserEvents>(GeneratedUserEvents.controllerName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new UserEvents(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<UserEvents>> {
        const resp = await REST.edit<UserEvents>(GeneratedUserEvents.controllerName, (this as any)[GeneratedUserEvents.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, type?: number, name?: string, dt?: string, data?: any, platform?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserEvents>> {
        return REST.edit<UserEvents>(GeneratedUserEvents.controllerName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<UserEvents>> {
        if (GeneratedUserEvents.primaryKeys.length !== GeneratedUserEvents.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserEvents|null = null, values: { id?: number, user?: number, type?: number, name?: string, dt?: string, data?: any, platform?: string }): Promise<SavedObject<UserEvents>> {
        if (obj === null || GeneratedUserEvents.primaryKeys.length !== GeneratedUserEvents.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserEvents.edit((obj as any)[GeneratedUserEvents.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserEvents.controllerName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserEvents.controllerName, (this as any)[GeneratedUserEvents.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}