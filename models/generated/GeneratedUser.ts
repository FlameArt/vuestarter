import REST, { Rows, Row, SavedObject } from 'flamerest';
import RESTTable from './RESTTable';
import { ref, watch } from 'vue';


import User from '@models/User';




class userFieldsDefault {
    public id: string  = "";
    public username: string  = "";
    public name: string  = "";
    public desc: string  = "";
    public auth_key: string  = "";
    public password_hash: string  = "";
    public password_reset_token: string  = "";
    public user_hash: string  = "";
    public email: string  = "";
    public phone: string  = "";
    public install_uuid: string  = "";
    public license_key: string  = "";
    public avatar: string  = "";
    public status: string  = "";
    public created_at: string  = "";
    public updated_at: string  = "";
    public verification_token: string  = "";
}


export default class GeneratedUser extends RESTTable {

    /**
     * Название таблицы
     */
    public static tableName: string = "user";

    /**
     * Ключевые поля
     */
    public static primaryKeys: string[] = ['id'];

    /**
     * Поля
     */

    public id!: number
    public username!: string | null 
    public name!: string | null 
    public desc!: string | null 
    public auth_key!: string
    public password_hash!: string
    public password_reset_token!: string | null 
    public user_hash!: string | null 
    public email!: string | null 
    public phone!: string | null 
    public install_uuid!: string | null 
    public license_key!: string | null 
    public avatar: any | null  = ref('');
    public status!: number
    public created_at!: number
    public updated_at!: number
    public verification_token!: string | null 

    /**
     * Набор всех полей для быстрого встраивания в функции получения
     */
    public static Fields = (assign: object = {}) => Object.assign(new userFieldsDefault, assign);


    /**
     * Получить одну запись
     * @param IDOrWhere ID или набор условий [вернёт первую запись]
     * @param fields поля, которые надо вернуть [если не указаны, вернёт все доступные]
     * @returns
     */
    static async one(IDOrWhere: { id?: number , username?: string , name?: string , desc?: string , auth_key?: string , password_hash?: string , password_reset_token?: string , user_hash?: string , email?: string , phone?: string , install_uuid?: string , license_key?: string , avatar?: any , status?: number , created_at?: number , updated_at?: number , verification_token?: string  } | number | string, fields: {id?: number , username?: string , name?: string , desc?: string , auth_key?: string , password_hash?: string , password_reset_token?: string , user_hash?: string , email?: string , phone?: string , install_uuid?: string , license_key?: string , avatar?: any , status?: number , created_at?: number , updated_at?: number , verification_token?: string } | Array<string> | null = null, extfields?: object | Array<string>): Promise<User | null> {
        return REST.one(this.tableName, IDOrWhere, extfields, fields, this.primaryKeys[0]);
    }

    /**
     * Параметры
     * @param params
     * @returns
     */
    static async all(params?: { where?: object, fields?: {id?: number , username?: string , name?: string , desc?: string , auth_key?: string , password_hash?: string , password_reset_token?: string , user_hash?: string , email?: string , phone?: string , install_uuid?: string , license_key?: string , avatar?: any , status?: number , created_at?: number , updated_at?: number , verification_token?: string } | Array<string>, extfields?: object | Array<string>, sort?: Array<"id"|"-id"|"username"|"-username"|"name"|"-name"|"desc"|"-desc"|"auth_key"|"-auth_key"|"password_hash"|"-password_hash"|"password_reset_token"|"-password_reset_token"|"user_hash"|"-user_hash"|"email"|"-email"|"phone"|"-phone"|"install_uuid"|"-install_uuid"|"license_key"|"-license_key"|"avatar"|"-avatar"|"status"|"-status"|"created_at"|"-created_at"|"updated_at"|"-updated_at"|"verification_token"|"-verification_token">, page?: number, perPage?: number, tree?: number }): Promise<Rows<User>> {
        return REST.all<User>(this.tableName, params);
    }

    /**
     * Создать этот объект, инициализировав переменные
     * @param params
     */
    constructor(params?: {id?: number, username?: string, name?: string, desc?: string, auth_key: string, password_hash: string, password_reset_token?: string, user_hash?: string, email?: string, phone?: string, install_uuid?: string, license_key?: string, avatar?: any, status?: number, created_at: number, updated_at: number, verification_token?: string}) {

        super();
        if(params) Object.assign(this, params);
        watch(this.avatar, (n, o)=>this.prepare())
      
    }

    /**
     * Создать объект через инициализатор
     * @returns
     */
    public async create(): Promise<SavedObject<User>> {
        const result = await REST.create<User>(User.tableName, this, null, null, null);
        if(result.data !== undefined)
            REST.fillObject(this, result.data)
        return result;
    }

    /**
     * Создать объект через прямой вызов функции
     * @param params
     */
    public static async create(params: {id?: number , username?: string , name?: string , desc?: string , auth_key?: string , password_hash?: string , password_reset_token?: string , user_hash?: string , email?: string , phone?: string , install_uuid?: string , license_key?: string , avatar?: any , status?: number , created_at?: number , updated_at?: number , verification_token?: string }, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<User>> {
        const result = await REST.create<User>(User.tableName, params, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
        if (result.data !== undefined)
            result.data = REST.fillObject(new User(), result.data);
        return result;
    }

    /**
     * Изменить значения из текущей модели
     * @param params
     */
    public async edit(): Promise<SavedObject<User>> {
        const resp = await REST.edit<User>(User.tableName, (this as any)[User.primaryKeys[0]], this, null, null, null);
        Object.assign(this, resp.data);
        return resp;
    }

    /**
     * Изменить значения через прямой вызов функции
     * @param params
     */
    public static async edit(ID: number | string, values: {id?: number, username?: string, name?: string, desc?: string, auth_key?: string, password_hash?: string, password_reset_token?: string, user_hash?: string, email?: string, phone?: string, install_uuid?: string, license_key?: string, avatar?: any, status?: number, created_at?: number, updated_at?: number, verification_token?: string}, tree?: { appendTo?: number | string | null, insertAfter?: number | string | null, insertFirst?: number | string | null }): Promise<SavedObject<User>> {
        return REST.edit<User>(User.tableName, ID, values, tree?.appendTo ?? null, tree?.insertAfter ?? null, tree?.insertFirst ?? null);
    }


    /**
     * Создать или обновить значения
     */
    public save(): Promise<SavedObject<User>> {
        if (GeneratedUser.primaryKeys.length !== GeneratedUser.primaryKeys.filter(r => (this as any)[r] !== null  && (this as any)[r] !== undefined).length)
            return this.create();
        else
            return this.edit();
    }

    /**
     * Создать или обновить значения через прямой вызов функции
     * @param params
     */
    public static save(obj: GeneratedUser|null = null, values: { id?: number, username?: string, name?: string, desc?: string, auth_key: string, password_hash: string, password_reset_token?: string, user_hash?: string, email?: string, phone?: string, install_uuid?: string, license_key?: string, avatar?: any, status?: number, created_at: number, updated_at: number, verification_token?: string }): Promise<SavedObject<User>> {
        if (obj === null || GeneratedUser.primaryKeys.length !== GeneratedUser.primaryKeys.filter(r => (obj as any)[r] !== null).length)
            return this.create(values);
        else
            return GeneratedUser.edit((obj as any)[GeneratedUser.primaryKeys[0]], values);
    }


    /**
     * Удалить запись или набор записей
     * @param table
     * @param id
     * @param byFields
     */
    public static async delete(id: number | string | null, byFields?: object): Promise<boolean|Array<any>> {
        return REST.remove(User.tableName, id ?? 0, byFields);
    }

    /**
     * Удалить эту запись
     * @param table
     * @param id
     * @param byFields
     */
    public async delete(): Promise<boolean|Array<any>> {
        return REST.remove(User.tableName, (this as any)[User.primaryKeys[0]]);
    }

    /**
     * Подготовить текущую запись к отправке, загрузить все файлы
     * @returns
     */
    public async prepare() {
        return REST.prepare(this);
    }



}