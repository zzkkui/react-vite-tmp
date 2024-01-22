import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import api from './query'

import { rootReducer } from './reducers'

// const isDev = process.env.NODE_ENV === 'development'

export function configureAppState(preloadedState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      // return isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()
      return getDefaultMiddleware({
        thunk: { extraArgument: { testArg: 'hahaha' } },
      }).concat(...[api.middleware])
    },
    preloadedState,
  })

  return store
}

const store = configureAppState()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
