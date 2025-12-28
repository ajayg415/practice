import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';

// Derive baseUrl and path from configured API_URL
let baseUrl = API_URL;
let apiPath = '';
try {
  const u = new URL(API_URL);
  baseUrl = u.origin;
  apiPath = u.pathname + u.search; // e.g. /todos?_limit=20
} catch (e) {
  // fall back to API_URL as-is
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => apiPath || '/todos?_limit=20',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos', id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // optimistic update: update cache immediately, rollback on error
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getTodos', undefined, (draft) => {
            const item = draft?.find((d) => d.id === arg.id);
            if (item) {
              Object.assign(item, { ...arg });
            }
          })
        );
        return queryFulfilled.catch(() => patchResult.undo());
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
});

export const { useGetTodosQuery, useUpdateTodoMutation } = api;
