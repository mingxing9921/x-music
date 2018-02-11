import Config from '../config'
import Storage from '../storage'
import {spin, spinHidden} from './spin'
import {alert} from './message'
import api from '../api'

export const LOGIN = 'LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const ACCOUNT = 'ACCOUNT'

const login = (obj) => {
				return {type: LOGIN, obj}
}
const loginError = (obj) => {
				return {type: LOGIN_ERROR, obj}
}

const account = (obj) => {
				return {type: ACCOUNT, obj}
}

/**
 * 登录
 * type 登录方式
 * params 账户名和密码
 */

export function loginAction(type, params) {
				return async dispatch => {
								dispatch(spin());
								try {
												//let data = await api( Config.login + type, 'get', params);
                                                let data = await api(Config.login, 'get', params);
												if (data && data.code == 200) {
                                                    console.log(data)
																//dispatch(login(data));
																dispatch(account(data));
																Storage.put('uid', data.account.id);
																dispatch(spinHidden());
												} else if (data && data.code != 200) {
																dispatch(loginError(data.msg));
																dispatch(spinHidden());
																dispatch(alert(data.msg));
												}
								} catch (e) {
												alert('5555555555555')
												console.log(e);
								}
				}
}
