import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookDemoApi = createApi({
  reducerPath: "bookademoapi",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1/demoRequest" }),

  endpoints: (builder) => ({
    postBookADemo: builder.mutation<any, any>({
      query: (data) => ({
        url: ``,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostBookADemoMutation } = bookDemoApi;
