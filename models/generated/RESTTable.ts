export default class RESTTable {

  /**
   * Имя таблицы
   */
  public static tableName: string = "";

  /**
   * Левый джоин
   * @param on
   * @returns
   */
  public static LeftJoin(on: object) {
    return this.Join(on, "left")
  }

  /**
   * Правый джоин
   * @param on
   * @returns
   */
  public static RightJoin(on: object) {
    return this.Join(on, "right")
  }

  /**
   * Внутренний джоин
   * @param on
   * @returns
   */
  public static InnerJoin(on: object) {
    return this.Join(on, "inner")
  }

  /**
   * Сделать JOIN к таблице без foreign keys (только по условию)
   * @param on условие
   * @param typeJoin тип join
   * @returns
   */
  public static Join(on: object, typeJoin: "left" | "right" | "inner" = "left") {
    return {
      ____joinFilter____: true,
      table: this.tableName,
      type: typeJoin,
      on: on
    }
  }

  /**
   * Прогрузить данные
   * @param loadData
   */
  public load(loadData: any) {

    for (const key in this) {
      if (loadData[key] !== undefined) this[key] = loadData[key];
    }

  }

}