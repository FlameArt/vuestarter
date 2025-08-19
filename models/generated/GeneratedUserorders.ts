import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';
import { plainToInstance } from 'class-transformer';
import { IsString  } from 'class-validator';


import UserOrders from '@models/UserOrders';


import User from '@models/User';
import Subscriptions from '@models/Subscriptions';


class UserOrdersFieldsDefault {
    public id: string  = "";
    public user: string  | User = "";
    public affiliate: string  = "";
    public name: string  = "";
    public desc: string  = "";
    public subscription: string  | Subscriptions = "";
    public total: string  = "";
    public currency: string  = "";
    public total_base: string  = "";
    public currency_base: string  = "";
    public data: string  = "";
    public paymethod: string  = "";
    public paysystem: string  = "";
    public paystatus: string  = "";
    public paytype: string  = "";
    public transaction_id: string  = "";
    public transaction_data: string  = "";
    public transaction_dt: string  = "";
    public status: string  = "";
    public is_refund: string  = "";
    public comment_user: string  = "";
    public comment_manager: string  = "";
    public created_dt: string  = "";
    public updated_dt: string  = "";
}


export default class GeneratedUserOrders extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user_orders";

    /**
     * Название контроллера
     */
    public static controllerName: string = "user-orders";

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
    public name!: string | null 
    public desc!: string | null 
    public subscription!: number & Subscriptions | null 
    public total!: number | null 
    public currency!: string | null 
    public total_base!: number | null 
    public currency_base!: string | null 
    public data!: any | null 
    public paymethod!: string | null 
    public paysystem!: string | null 
    public paystatus!: string | null 
    public paytype!: string | null 
    public transaction_id!: string | null 
    public transaction_data!: any | null 
    public transaction_dt!: string | null 
    public status!: string | null 
    public is_refund!: number | null 
    public comment_user!: string | null 
    public comment_manager!: string | null 
    public created_dt!: string | null 
    public updated_dt!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new UserOrdersFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , user?: number  | User, affiliate?: number , name?: string , desc?: string , subscription?: number  | Subscriptions, total?: number , currency?: string , total_base?: number , currency_base?: string , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , paytype?: string , transaction_id?: string , transaction_data?: any , transaction_dt?: string , status?: string , is_refund?: number , comment_user?: string , comment_manager?: string , created_dt?: string , updated_dt?: string  } | number | string, fields: {id?: number , user?: number  | User, affiliate?: number , name?: string , desc?: string , subscription?: number  | Subscriptions, total?: number , currency?: string , total_base?: number , currency_base?: string , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , paytype?: string , transaction_id?: string , transaction_data?: any , transaction_dt?: string , status?: string , is_refund?: number , comment_user?: string , comment_manager?: string , created_dt?: string , updated_dt?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<UserOrders | null> {
        const result = await REST.one<UserOrders>(this.controllerName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
        return result === null ? null : plainToInstance(UserOrders, result);
    }

    /**
     * Загрузить список строк
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , user?: number  | User, affiliate?: number , name?: string , desc?: string , subscription?: number  | Subscriptions, total?: number , currency?: string , total_base?: number , currency_base?: string , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , paytype?: string , transaction_id?: string , transaction_data?: any , transaction_dt?: string , status?: string , is_refund?: number , comment_user?: string , comment_manager?: string , created_dt?: string , updated_dt?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"user"|"-user"|"affiliate"|"-affiliate"|"name"|"-name"|"desc"|"-desc"|"subscription"|"-subscription"|"total"|"-total"|"currency"|"-currency"|"total_base"|"-total_base"|"currency_base"|"-currency_base"|"data"|"-data"|"paymethod"|"-paymethod"|"paysystem"|"-paysystem"|"paystatus"|"-paystatus"|"paytype"|"-paytype"|"transaction_id"|"-transaction_id"|"transaction_data"|"-transaction_data"|"transaction_dt"|"-transaction_dt"|"status"|"-status"|"is_refund"|"-is_refund"|"comment_user"|"-comment_user"|"comment_manager"|"-comment_manager"|"created_dt"|"-created_dt"|"updated_dt"|"-updated_dt">, page?: number, perPage?: number, tree?: number }): Promise<Rows<UserOrders>> {
        const result = await REST.all<UserOrders>(this.controllerName, params);
        if (result.data)
            for (let i = 0; i < result.data.length; i++)
                result.data[i] = plainToInstance(UserOrders, result.data[i]);
        return result;
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, user?: number, affiliate?: number, name?: string, desc?: string, subscription?: number, total?: number, currency?: string, total_base?: number, currency_base?: string, data?: any, paymethod?: string, paysystem?: string, paystatus?: string, paytype?: string, transaction_id?: string, transaction_data?: any, transaction_dt?: string, status?: string, is_refund?: number, comment_user?: string, comment_manager?: string, created_dt?: string, updated_dt?: string}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<UserOrders>> {
        const result = await REST.create<UserOrders>(GeneratedUserOrders.controllerName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , user?: number  | User, affiliate?: number , name?: string , desc?: string , subscription?: number  | Subscriptions, total?: number , currency?: string , total_base?: number , currency_base?: string , data?: any , paymethod?: string , paysystem?: string , paystatus?: string , paytype?: string , transaction_id?: string , transaction_data?: any , transaction_dt?: string , status?: string , is_refund?: number , comment_user?: string , comment_manager?: string , created_dt?: string , updated_dt?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserOrders>> {
        const result = await REST.create<UserOrders>(GeneratedUserOrders.controllerName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new UserOrders(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<UserOrders>> {
        const resp = await REST.edit<UserOrders>(GeneratedUserOrders.controllerName, (this as any)[GeneratedUserOrders.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, user?: number, affiliate?: number, name?: string, desc?: string, subscription?: number, total?: number, currency?: string, total_base?: number, currency_base?: string, data?: any, paymethod?: string, paysystem?: string, paystatus?: string, paytype?: string, transaction_id?: string, transaction_data?: any, transaction_dt?: string, status?: string, is_refund?: number, comment_user?: string, comment_manager?: string, created_dt?: string, updated_dt?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<UserOrders>> {
        return REST.edit<UserOrders>(GeneratedUserOrders.controllerName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<UserOrders>> {
        if (GeneratedUserOrders.primaryKeys.length !== GeneratedUserOrders.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUserOrders|null = null, values: { id?: number, user?: number, affiliate?: number, name?: string, desc?: string, subscription?: number, total?: number, currency?: string, total_base?: number, currency_base?: string, data?: any, paymethod?: string, paysystem?: string, paystatus?: string, paytype?: string, transaction_id?: string, transaction_data?: any, transaction_dt?: string, status?: string, is_refund?: number, comment_user?: string, comment_manager?: string, created_dt?: string, updated_dt?: string }): Promise<SavedObject<UserOrders>> {
        if (obj === null || GeneratedUserOrders.primaryKeys.length !== GeneratedUserOrders.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUserOrders.edit((obj as any)[GeneratedUserOrders.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserOrders.controllerName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(GeneratedUserOrders.controllerName, (this as any)[GeneratedUserOrders.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}