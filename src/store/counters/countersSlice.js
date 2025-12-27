import { createSlice } from "@reduxjs/toolkit"


const counterClice = createSlice({
    name: 'counters',
    initialState: {},
    reducers: {
        resetAll: (state) => {
            Object.keys(state).forEach(key => {
                state[key] = 0;
            });
        },
        reset: (state, action) => {
            const name = action.payload;
            if (state[name] !== undefined) {
                state[name] = 0;
            }
        },
        createCounters: (state, action) => {
            const counters = action.payload;
            Object.keys(counters).forEach(key => {
                state[key] = counters[key];
            });
        },
        addCounter: (state, action) => {
            const name = action.payload;
            if (state[name]) {
                state[name]++;
            } else {
                state[name] = 1;
            }
        },
        increment: (state, action) => {
            const name = action.payload;
            if (state[name] !== undefined) {
                state[name]++;
            } else {
                state[name] = 1;
            }
        },
        decrement: (state, action) => {
            const name = action.payload;
            if (state[name] !== undefined) {
                state[name] = Math.max(0, state[name] - 1);
            } else {
                state[name] = 0;
            }   
        }
    }
});

export const { resetAll, reset, addCounter, increment, decrement, createCounters } = counterClice.actions;

export default counterClice.reducer;