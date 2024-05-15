import { apiSlice } from "./apiSlice";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (page) => ({
        url: "/adhoc/getSampleJdJSON",
        method: "POST",
        body: { limit: 10, offset: (page - 1) * 10 },
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.jdList.push(...newItems.jdList);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetJobsQuery } = jobApiSlice;
