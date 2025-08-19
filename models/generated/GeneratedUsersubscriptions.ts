import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';
import { plainToInstance } from 'class-transformer';
import { IsString  } from 'class-validator';


import UserSubscriptions from '@models/UserSubscriptions';


import User from '@models/User';
import Subscriptions from '@models/Subscriptions';


class UserSubscriptionsFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public subscription: string  | Subscriptions = "";
    public started_dt: string  = "";
    public payedto_dt: string  = "";
    public status: string  = "";
}


export default class GeneratedUserSubscriptions extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_subscriptions";

    /**
     * Название контроллера
     */
    public static controllerName: string = "user-subscriptions";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public user!: number & User | null 
    public subscription!: number & Subscriptions | null 
    public started_dt!: string | null 
    public payedto_dt!: string | null 
    public status!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new UserSubscriptionsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, subscription?: number  | Subscriptions, started_dt?: string , payedto_dt?: string , status?: string  } | number | string, fields: {id?: number , user?: number  | User, subscription?: number  | Subscriptions, started_dt?: string , payedto_dt?: string , status?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<UserSubscriptions | null> {
        const result = await REST.one<UserSubscriptions>(this.controllerName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
        return result === null ? null : plainToInstance(UserSubscriptions, result);
    }

    /**
     * Загрузить список строк
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, subscription?: number  | Subscriptions, started_dt?: string , payedto_dt?: string , status?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"subscription"|"-subscription"|"started_dt"|"-started_dt"|"payedto_dt"|"-payedto_dt"|"status"|"-status">, page?: number, perPage?: number, tree?: number }): Promise<Rows<UserSubscriptions>> {
        const result = await REST.all<UserSubscriptions>(this.controllerName, params);
        if (result.data)
            for (let i = 0; i < result.data.length; i++)
                result.data[i] = plainToInstance(UserSubscriptions, result.data[i]);
        return result;
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
    public async create(): Promise<SavedObject<UserSubscriptions>> {
        const result = await REST.create<UserSubscriptions>(GeneratedUserSubscriptions.controllerName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, subscription?: number  | Subscriptions, started_dt?: string , payedto_dt?: string , status?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserSubscriptions>> {
        const result = await REST.create<UserSubscriptions>(GeneratedUserSubscriptions.controllerName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new UserSubscriptions(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<UserSubscriptions>> {
        const resp = await REST.edit<UserSubscriptions>(GeneratedUserSubscriptions.controllerName, (this as any)[GeneratedUserSubscriptions.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, subscription?: number, started_dt?: string, payedto_dt?: string, status?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserSubscriptions>> {
        return REST.edit<UserSubscriptions>(GeneratedUserSubscriptions.controllerName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<UserSubscriptions>> {
        if (GeneratedUserSubscriptions.primaryKeys.length !== GeneratedUserSubscriptions.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserSubscriptions|null = null, values: { id?: number, user?: number, subscription?: number, started_dt?: string, payedto_dt?: string, status?: string }): Promise<SavedObject<UserSubscriptions>> {
        if (obj === null || GeneratedUserSubscriptions.primaryKeys.length !== GeneratedUserSubscriptions.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserSubscriptions.edit((obj as any)[GeneratedUserSubscriptions.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserSubscriptions.controllerName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserSubscriptions.controllerName, (this as any)[GeneratedUserSubscriptions.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}