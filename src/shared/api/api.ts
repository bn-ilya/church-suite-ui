import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvent, IEvents } from "./interfaces/events";
import { TFiles } from "./interfaces/upload";
import { IAddLiveChatClientRes, ILiveChatClient } from "./interfaces/liveChatClient";

export const api = createApi({
  reducerPath: 'strapiApi',
  baseQuery: fetchBaseQuery({baseUrl: `http://${process.env.NEXT_PUBLIC_IP_SERVER}:1337/api/`, headers: {
    'Authorization': 'Bearer be421c96c982379099bb5be3c7a567e25aee6997f2d7d79822be7c5ebfc8d7c8dc8405b0d5156eb1043b977a2d903c414f0dd7ccb1ea9629f9bf593e9189538af40a8ef69d8c9d86cb4a7f680e7e7c2e554b3b2518064fe8947b56df9393942ea752d273e2c98356c82b9d07b3579cc41ff8a77896c6991bc04af2fe5f08eb5b'
  }}),
  endpoints: (build) => ({
    getEvents: build.query<Array<IEvent>, void>({
      query: () => ({
        url: 'events'
      }),
      transformResponse: (response: IEvents) => response.data,
    }),
    uploadImage: build.mutation<TFiles, FileList>({
      query: (files) => {
        let bodyFormData = new FormData();
        for(let i = 0; i < files.length; i++) {
          bodyFormData.append('files', files[i]);
        }
        return {
          url: 'upload',
          method: 'POST',
          body: bodyFormData,
          formData: true
        }
      }
    }),
    addLiveChatClient: build.mutation<IAddLiveChatClientRes, ILiveChatClient>({
      query: (data) => ({
        url: 'live-chat-clients',
        method: 'POST',
        body: {
          data
        },    
      })
    })

  }),
})

export const { useGetEventsQuery, useAddLiveChatClientMutation, useUploadImageMutation } = api; 