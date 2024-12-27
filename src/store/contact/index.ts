import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUs = createApi({
  reducerPath: "contactus",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1/contact" }),

  endpoints: (builder) => ({
    contactus: builder.mutation<any, any>({
      query: (data) => ({
        url: ``,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useContactusMutation } = contactUs;
