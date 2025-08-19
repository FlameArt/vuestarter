import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';
import { plainToInstance } from 'class-transformer';
import { IsString  } from 'class-validator';


import UserBalances from '@models/UserBalances';


import User from '@models/User';


class UserBalancesFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public type: string  = "";
    public balance: string  = "";
}


export default class GeneratedUserBalances extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_balances";

    /**
     * Название контроллера
     */
    public static controllerName: string = "user-balances";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public user!: number & User
    public type!: string
    public balance!: number | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new UserBalancesFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, type?: string , balance?: number  } | number | string, fields: {id?: number , user?: number  | User, type?: string , balance?: number } | Array<string> | null = null, extfields?: object | Array<string>): Promise<UserBalances | null> {
        const result = await REST.one<UserBalances>(this.controllerName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
        return result === null ? null : plainToInstance(UserBalances, result);
    }

    /**
     * Загрузить список строк
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, type?: string , balance?: number } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"type"|"-type"|"balance"|"-balance">, page?: number, perPage?: number, tree?: number }): Promise<Rows<UserBalances>> {
        const result = await REST.all<UserBalances>(this.controllerName, params);
        if (result.data)
            for (let i = 0; i < result.data.length; i++)
                result.data[i] = plainToInstance(UserBalances, result.data[i]);
        return result;
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, user: number, type?: string, balance?: number}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<UserBalances>> {
        const result = await REST.create<UserBalances>(GeneratedUserBalances.controllerName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, type?: string , balance?: number }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserBalances>> {
        const result = await REST.create<UserBalances>(GeneratedUserBalances.controllerName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new UserBalances(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<UserBalances>> {
        const resp = await REST.edit<UserBalances>(GeneratedUserBalances.controllerName, (this as any)[GeneratedUserBalances.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, type?: string, balance?: number}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserBalances>> {
        return REST.edit<UserBalances>(GeneratedUserBalances.controllerName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<UserBalances>> {
        if (GeneratedUserBalances.primaryKeys.length !== GeneratedUserBalances.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserBalances|null = null, values: { id?: number, user: number, type?: string, balance?: number }): Promise<SavedObject<UserBalances>> {
        if (obj === null || GeneratedUserBalances.primaryKeys.length !== GeneratedUserBalances.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserBalances.edit((obj as any)[GeneratedUserBalances.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserBalances.controllerName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserBalances.controllerName, (this as any)[GeneratedUserBalances.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}