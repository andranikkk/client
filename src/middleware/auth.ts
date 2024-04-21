import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});

listenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    console.log(action.payload, "from ./middleware/auth.ts by registering");
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});
