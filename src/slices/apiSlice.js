import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: 'https://api.weekday.technology' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({}),
});