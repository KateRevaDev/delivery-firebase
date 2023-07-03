import { configureStore } from '@reduxjs/toolkit'
// Logger with default options
import logger from 'redux-logger'
import mainReducer from './reducer'

// import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = configureStore({
  reducer: mainReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}).concat(sagaMiddleware, logger),
})

// then run the saga
sagaMiddleware.run(mySaga)

// export const store = configureStore({
//   reducer: mainReducer,
// })