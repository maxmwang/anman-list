import { Middleware } from 'redux';
import axios from 'axios';

import type { RootState as R } from '../store';
import type Handler from './handlers/handler';

import * as ITEM_EVENTS from '../constants/actionNames/itemEvents';
import * as ITEM_HANDLERS from './handlers/itemHandlers';
import * as USER_EVENTS from '../constants/actionNames/userEvents';
import * as USER_HANDLERS from './handlers/userHandlers';

axios.defaults.withCredentials = true;
axios.defaults.validateStatus = () => true;

const handlers: { [key: string]: Handler } = {
  [ITEM_EVENTS.ITEM_GET]: ITEM_HANDLERS.handleItemGet,
  [ITEM_EVENTS.ITEM_ADD]: ITEM_HANDLERS.handleItemAdd,
  [ITEM_EVENTS.ITEM_DELETE]: ITEM_HANDLERS.handleItemDelete,
  [ITEM_EVENTS.ITEM_UPDATE]: ITEM_HANDLERS.handleItemUpdate,
  [USER_EVENTS.USER_LOGIN]: USER_HANDLERS.handleUserLogin,
  [USER_EVENTS.USER_REGISTER]: USER_HANDLERS.handleUserRegister,
  [USER_EVENTS.USER_LOGOUT]: USER_HANDLERS.handleUserLogout,
  [USER_EVENTS.USER_AUTH]: USER_HANDLERS.handleUserAuth,
};

const axiosMiddleware: Middleware<{}, R> = ({ dispatch }) => (next) => async (action) => {
  if (action.type in handlers) {
    await handlers[action.type](dispatch, action);
  }
  return next(action);
};

export default axiosMiddleware;
