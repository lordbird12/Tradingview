// const BASE_URL = 'http://localhost/asha/tradingview/trade-api/public';
const BASE_URL = 'https://stock.logo-design360.com/trade-api/public';  // base url เปลื่ยนในไฟล์ CharacterData.js ด้วย อยู่ใน public\assets\js\chart.js



export default {

  BASE_URL,

  Login: BASE_URL + "/api/login",
  Logout: BASE_URL + "/api/logout",

  CHECK_lOGIN: BASE_URL + "/api/check_login",

  //side
  GET_EMPLOYEE_GANT_MENU: BASE_URL + "/api/get_employee_menu",
  GET_EMPLOYEE_ONE_GANT_MENU: BASE_URL + "/api/get_employee_one_menu",


  ADD_PERMISSION: BASE_URL + "/api/permission",
  GET_PERMISSION: BASE_URL + "/api/get_permission",
  DELETE_PERMISSION: BASE_URL + "/api/delete_permission",
  EDIT_MENU_PERMISSION: BASE_URL + "/api/edit_menu_permission",


  MENU: BASE_URL + "/api/get_menu",
  GET_MENU_PERMISSION: BASE_URL + "/api/get_menu_permission",


  //employee
  GET_EMPLOYEE_ALL: BASE_URL + "/api/getEmployeeAll",
  GET_USER_PAGE: BASE_URL + "/api/user_page",

  IMPORT_EMPLOYEE: BASE_URL + "/api/ImportEmployee", //import excel


  ADD_USER: BASE_URL + "/api/user",
  RESET_PASSWORD: BASE_URL + "/api/reset_password",
  GET_ONE_USER: BASE_URL + "/api/get_one_user",
  EDIT_USER: BASE_URL + "/api/user",
  DELETE_USER: BASE_URL + "/api/user",

  GET_COMPANY: BASE_URL + "/api/trading_view_company",

  GET_DOPDOWN_YEAR: BASE_URL + "/api/getDopdownYear",


  //company
  COMPANY: BASE_URL + "/api/company",
  IMPORT_COMPANY: BASE_URL + "/api/import_company",

  //Daily
  
  DAILY: BASE_URL + "/api/daily",
  DAILY_LIST: BASE_URL + "/api/index",
  GET_DAILY: BASE_URL + "/api/get_daily",
  CLEAR_ALL_DAILY_DATA: BASE_URL + "/api/clear_daily_data",
  
  
  //Old
  OLD: BASE_URL + "/api/old",
  GET_OLD: BASE_URL + "/api/get_old",
  CLEAR_ALL_OLD_DATA: BASE_URL + "/api/clear_old_data",
  
  //home
  GET_TOP_TEN_DAILY: BASE_URL + "/api/get_top_ten_daily",
  GET_HOME_PAGE: BASE_URL + "/api/get_home_page",

  //log
  LOG_LIST: BASE_URL + "/api/get_log",
  GET_LOG_TYPE: BASE_URL + "/api/get_log_type",

  
  GET_DOPDOWN_YEAR: BASE_URL + "/api/getDopdownYear",



};