import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import mainReducer from './reducer'
import createSagaMiddleware from 'redux-saga'

import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true, serializableCheck: {
      // Ignore these action types
      ignoredActions: ['SAGA_ADD_GOOD', 'UPDATE_USERINFO'],
    },
  }).concat(sagaMiddleware, logger),
})

// then run the saga
sagaMiddleware.run(mySaga)
