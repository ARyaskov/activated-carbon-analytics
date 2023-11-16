import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { Event } from "../../analytics/dto/event";

const { ClickHouse } = require("clickhouse");

const SQL_GET_CTR_BY_TWO_DATES = `
SELECT reg_time as timestamp, ctr 
FROM x_table_summary_view 
WHERE reg_time 
BETWEEN {date1:String} AND {date2:String} ORDER BY timestamp ASC;
`;

const SQL_GET_CTR_BY_TWO_DATES_HOURS = `
SELECT timestamp, ctr 
FROM x_table_summary_view_hours 
WHERE timestamp 
BETWEEN {date1:String} AND {date2:String} ORDER BY timestamp ASC;
`;

const SQL_FCLICK_GET_EVPM_BY_TWO_DATES_HOURS = `
SELECT timestamp, evpm 
FROM evpm_fclick_view_hours 
WHERE timestamp 
BETWEEN {date1:String} AND {date2:String} ORDER BY timestamp ASC;
`;

const SQL_REGISTRATION_GET_EVPM_BY_TWO_DATES_HOURS = `
SELECT timestamp, evpm 
FROM evpm_registration_view_hours 
WHERE timestamp 
BETWEEN {date1:String} AND {date2:String} ORDER BY timestamp ASC;
`;

const SQL_CONTENT_GET_EVPM_BY_TWO_DATES_HOURS = `
SELECT timestamp, evpm 
FROM evpm_content_view_hours 
WHERE timestamp 
BETWEEN {date1:String} AND {date2:String} ORDER BY timestamp ASC;
`;

@Injectable()
export class XRepositoryStorageService {
  clickhouse: any;
  constructor() {
    this.clickhouse = new ClickHouse({
      url: process.env.CLICKHOUSE_HOST,
      basicAuth: {
        username: process.env.CLICKHOUSE_USERNAME,
        password: process.env.CLICKHOUSE_PASSWORD,
      },
      config: {
        database: process.env.CLICKHOUSE_DATABASE,
      },
    });
  }

  async getTop50Models() {
    return this.clickhouse
      .query(
        `
SELECT
    model AS name,
    COUNT(*) AS amount
FROM
    x_table
LEFT JOIN
    y_table
ON
    x_table.uid = y_table.uid
GROUP BY
    name
HAVING
    amount > 1;
ORDER BY
    amount DESC
LIMIT
    50;
`,
      )
      .toPromise();
  }

  async getCTRByDate(date: Date) {
    const dateDateTime = DateTime.fromJSDate(date).startOf("day");
    const nextDateDateTime = dateDateTime.plus({ days: 1 }).startOf("day");

    return this.clickhouse
      .query(SQL_GET_CTR_BY_TWO_DATES_HOURS, {
        params: {
          date1: dateDateTime.toFormat("yyyy-MM-dd"),
          date2: nextDateDateTime.toFormat("yyyy-MM-dd"),
        },
      })
      .toPromise();
  }

  async getCTRByTwoDates(date1: Date, date2: Date) {
    const date1DateTime = DateTime.fromJSDate(date1).startOf("day");
    const date2DateTime = DateTime.fromJSDate(date2).startOf("day");

    return this.clickhouse
      .query(SQL_GET_CTR_BY_TWO_DATES_HOURS, {
        params: {
          date1: date1DateTime.toFormat("yyyy-MM-dd"),
          date2: date2DateTime.toFormat("yyyy-MM-dd"),
        },
      })
      .toPromise();
  }

  getEvPMByTwoDates(date1: Date, date2: Date, mode: Event) {
    const date1DateTime = DateTime.fromJSDate(date1).startOf("day");
    const date2DateTime = DateTime.fromJSDate(date2).startOf("day");

    let sql = "";
    switch (mode) {
      case Event.fclick:
        sql = SQL_FCLICK_GET_EVPM_BY_TWO_DATES_HOURS;
        break;
      case Event.registration:
        sql = SQL_REGISTRATION_GET_EVPM_BY_TWO_DATES_HOURS;
        break;
      case Event.content:
        sql = SQL_CONTENT_GET_EVPM_BY_TWO_DATES_HOURS;
        break;
    }
    return this.clickhouse
      .query(sql, {
        params: {
          date1: date1DateTime.toFormat("yyyy-MM-dd"),
          date2: date2DateTime.toFormat("yyyy-MM-dd"),
        },
      })
      .toPromise();
  }
}
