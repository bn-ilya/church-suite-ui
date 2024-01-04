import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvent, IEvents } from "./strapiApi.interface";

export const strapiApi = createApi({
  reducerPath: 'strapiApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1337/api/', headers: {
    'Authorization': 'Bearer be421c96c982379099bb5be3c7a567e25aee6997f2d7d79822be7c5ebfc8d7c8dc8405b0d5156eb1043b977a2d903c414f0dd7ccb1ea9629f9bf593e9189538af40a8ef69d8c9d86cb4a7f680e7e7c2e554b3b2518064fe8947b56df9393942ea752d273e2c98356c82b9d07b3579cc41ff8a77896c6991bc04af2fe5f08eb5b'
  }}),
  endpoints: (build) => ({
    getEvents: build.query<Array<IEvent>, void>({
      query: () => ({
        url: 'events'
      }),
      transformResponse: (response: IEvents) => response.data,
    })
  }),
})

export const { useGetEventsQuery } = strapiApi; 