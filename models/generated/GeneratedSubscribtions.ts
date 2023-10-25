import REST, { Rows, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import Subscribtions from '@models/Subscribtions';




class subscribtionsFieldsDefault {
    public id: string  = "";
    public itemTable: string  = "";
    public item: string  = "";
    public name: string  = "";
    public desc: string  = "";
    public price: string  = "";
    public currency: string  = "";
    public countItems: string  = "";
    public periodDays: string  = "";
    public periodMonths: string  = "";
    public trialDays: string  = "";
    public isForeverItem: string  = "";
}


export default class GeneratedSubscribtions extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "subscribtions";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public itemTable!: string | null 
    public item!: number | null 
    public name!: string | null 
    public desc!: string | null 
    public price!: number | null 
    public currency!: string | null 
    public countItems!: number | null 
    public periodDays!: number | null 
    public periodMonths!: number | null 
    public trialDays!: number | null 
    public isForeverItem!: number | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new subscribtionsFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , itemTable?: string , item?: number , name?: string , desc?: string , price?: number , currency?: string , countItems?: number , periodDays?: number , periodMonths?: number , trialDays?: number , isForeverItem?: number  } | number | string, fields: {id?: number , itemTable?: string , item?: number , name?: string , desc?: string , price?: number , currency?: string , countItems?: number , periodDays?: number , periodMonths?: number , trialDays?: number , isForeverItem?: number } | Array<string> | null = null, extfields?: object | Array<string>): Promise<Subscribtions|null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , itemTable?: string , item?: number , name?: string , desc?: string , price?: number , currency?: string , countItems?: number , periodDays?: number , periodMonths?: number , trialDays?: number , isForeverItem?: number } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"itemTable"|"-itemTable"|"item"|"-item"|"name"|"-name"|"desc"|"-desc"|"price"|"-price"|"currency"|"-currency"|"countItems"|"-countItems"|"periodDays"|"-periodDays"|"periodMonths"|"-periodMonths"|"trialDays"|"-trialDays"|"isForeverItem"|"-isForeverItem">, page?: number, perPage?: number, tree?: number }): Promise<Rows<Subscribtions>> {
        return REST.all<Subscribtions>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, itemTable?: string, item?: number, name?: string, desc?: string, price?: number, currency?: string, countItems?: number, periodDays?: number, periodMonths?: number, trialDays?: number, isForeverItem?: number}) {

        super();
        if(params) Object.assign(this, params);
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<Subscribtions>> {
        const result = await REST.create<Subscribtions>(Subscribtions.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , itemTable?: string , item?: number , name?: string , desc?: string , price?: number , currency?: string , countItems?: number , periodDays?: number , periodMonths?: number , trialDays?: number , isForeverItem?: number }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Subscribtions>> {
        const result = await REST.create<Subscribtions>(Subscribtions.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new Subscribtions(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<Subscribtions>> {
        const resp = await REST.edit<Subscribtions>(Subscribtions.tableName, (this as any)[Subscribtions.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, itemTable?: string, item?: number, name?: string, desc?: string, price?: number, currency?: string, countItems?: number, periodDays?: number, periodMonths?: number, trialDays?: number, isForeverItem?: number}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<Subscribtions>> {
        return REST.edit<Subscribtions>(Subscribtions.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<Subscribtions>> {
        if (GeneratedSubscribtions.primaryKeys.length !== GeneratedSubscribtions.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedSubscribtions|null = null, values: { id?: number, itemTable?: string, item?: number, name?: string, desc?: string, price?: number, currency?: string, countItems?: number, periodDays?: number, periodMonths?: number, trialDays?: number, isForeverItem?: number }): Promise<SavedObject<Subscribtions>> {
        if (obj === null || GeneratedSubscribtions.primaryKeys.length !== GeneratedSubscribtions.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedSubscribtions.edit((obj as any)[GeneratedSubscribtions.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(Subscribtions.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(Subscribtions.tableName, (this as any)[Subscribtions.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}