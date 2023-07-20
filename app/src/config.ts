export const appConfig = {
  name: process.env.APP_NAME || 'm6-agency-api',
  debug: !!process.env.APP_DEBUG,
}

export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

export const paginateConfig = {
  defaultPerPage: process.env.PAGINATE_PER_PAGE || 10,
  maxPerPage: process.env.PAGINATE_MAX_PER_PAGE || 50,
  minPerPage: process.env.PAGINATE_MIN_PER_PAGE || 1,
  maxFilterTime: process.env.PAGINATE_MAX_FILTER_TIME || 30,//days
}
