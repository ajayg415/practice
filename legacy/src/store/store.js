import { configureStore } from "@reduxjs/toolkit";

import countersReducer from "./counters/countersSlice";

export const store = configureStore({
    reducer: {
        counters: countersReducer
    }
});
