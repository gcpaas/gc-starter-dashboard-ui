/*!
 * 数据源管理
 */
import { get, post } from 'packages/js/utils/http'

/**
 * 新增/修改数据源
 * @param params
 * @param flag
 * @returns {*}
 */
const addOrUpdateDataSource = (params = {}, flag = false) => post('/dashboard/datasource/addOrUpdateDataSource', params, flag)

/**
 * 数据源名称校验
 * @param params
 * @param flag
 * @returns {*}
 */
const checkRepeat = (params = {}, flag = false) => post('/dashboard/datasource/checkRepeat', params, flag)

/**
 * 数据源连接测试
 * @param params
 * @param flag
 * @returns {*}
 */
const sourceLinkTest = (params = {}, flag = false) => post('/dashboard/datasource/sourceLinkTest', params, flag)

/**
 * 获取数据源列表
 * @param params
 * @param flag
 * @returns {*}
 */
const datasourcePage = (params = {}, flag = false) => get('/dashboard/datasource/page', params, flag)

/**
 * 获取数据源列表
 * @param params
 * @param flag
 * @returns {*}
 */
const datasourceList = (params = {}, flag = false) => get('/dashboard/datasource/list', params, flag)

/**
 * 删除数据源
 * @param id
 * @param flag
 * @returns {*}
 */
const sourceRemove = (id = '-1', flag = false) => get(`/dashboard/datasource/sourceRemove/${id}`, {}, flag)

/**
 * 获取数据源下表列表
 * @param id
 * @param flag
 * @returns {*}
 */
const getSourceTable = (id = '-1', flag = false) => get(`/dashboard/datasource/getSourceTable/${id}`, {}, flag)

/**
 * 获取数据源下视图列表
 * @param id
 * @param flag
 * @returns {*}
 */
const getSourceView = (id = '-1', flag = false) => get(`/dashboard/datasource/getSourceView/${id}`, {}, flag)

export {
  addOrUpdateDataSource,
  checkRepeat,
  sourceLinkTest,
  datasourcePage,
  datasourceList,
  sourceRemove,
  getSourceTable,
  getSourceView
}
