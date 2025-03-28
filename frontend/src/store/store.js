import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import eventReducer from "../features/eventSlice";
import authReducer from "../features/authSlice";

const rootReducer = combineReducers({
  events: eventReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // This can be used to ignore specific actions
  ignoredActions: ["persist/PERSIST"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
