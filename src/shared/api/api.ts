import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvent, IEvents } from "./interfaces/events";
import { IAddLiveChatClientRes, IDeleteLiveChatClientRes, IGetLiveChatClientByCodeRes, IGetLiveChatClientDataRes, IGetLiveChatClientRes, ILiveChatClient, IUpdateClientReq, IUpdateLiveChatClientRes } from "./interfaces/liveChatClient";
import { IUploadFile } from "./interfaces/upload";
import { IConfirmDataLogin, IConfirmLoginResSuccess, ICreateUserResSuccess, IDeleteUserResSuccess, IEditDataUser, IEditUserResSuccess, IGetMeResSuccess, ILoginDataUser, ILoginDataUserReq, ILoginUserResSuccess, IRegDataUser, ISetLcData, ISetLcResSuccess } from ".";

export const api = createApi({
  reducerPath: 'strapiApi',
  tagTypes: ["MeData"],
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
    uploadImage: build.mutation<Array<IUploadFile>, FileList>({
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
      }),
    }),
    updateLiveChatClient: build.mutation<IUpdateLiveChatClientRes, IUpdateClientReq>({
      query: (data) => ({
        url: `live-chat-clients/${data.id}`,
        method: 'PUT',
        body: {
          data: data.body
        },    
      }),
      invalidatesTags: ["MeData"]
    }),
    deleteLiveChatClient: build.mutation<IDeleteLiveChatClientRes, number>({
      query: (id) => ({
        url: `live-chat-clients/${id}`,
        method: 'DELETE'  
      })
    }),
    getLiveChatClient: build.query<IGetLiveChatClientDataRes, number>({
      query: (id) => ({
        url: `live-chat-clients/${id}?populate[0]=cheques`,
      }),
      transformResponse: (response: IGetLiveChatClientRes) => response.data,
    }),
    getLiveChatClientByCode: build.query<IGetLiveChatClientDataRes, number>({
      query: (code) => ({
        url: `live-chat-clients/?filters[code][$eq]=${code}&populate[0]=cheques`,
      }),
      transformResponse: (response: IGetLiveChatClientByCodeRes) => response.data?.[0],
    }),
    createUser: build.mutation<ICreateUserResSuccess, IRegDataUser>({
      query: (regData) => ({
        url: `/users`,
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: regData     
      }),
    }),
    loginUser: build.mutation<ILoginUserResSuccess, ILoginDataUserReq>({
      query: (loginData) => ({
        url: `/users-permissions/login`,
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: loginData     
      }),
      invalidatesTags: ["MeData"]
    }),
    editUser: build.mutation<IEditUserResSuccess, IEditDataUser>({
      query: (editData) => ({
        url: `/users-permissions/profile`,
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: editData     
      }),
      invalidatesTags: ["MeData"]
    }),
    confirmLogin: build.mutation<IConfirmLoginResSuccess, IConfirmDataLogin>({
      query: (confirmData) => ({
        url: `/users-permissions/verify`,
        method: 'POST',
        body: confirmData
      }),
      invalidatesTags: ["MeData"]
    }),
    setLcForm: build.mutation<ISetLcResSuccess, ISetLcData>({
      query: (lcFormData) => ({
        url: `/users-permissions/setLcForm`,
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: lcFormData
      }),
      invalidatesTags: ["MeData"]
    }), 
    getMe: build.query<IGetMeResSuccess, any>({
      query: () => ({
        url: `/users/me`,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
      providesTags: ["MeData"]
    }),
    deleteUser: build.mutation<IDeleteUserResSuccess, void>({
      query: () => ({
        url: `/users-permissions/profile`,
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
      invalidatesTags: ["MeData"]
    }), 
  }),
})

export const 
{ 
  useGetEventsQuery,
  useAddLiveChatClientMutation, 
  useUploadImageMutation,
  useGetLiveChatClientQuery,
  useLazyGetLiveChatClientQuery,
  useLazyGetLiveChatClientByCodeQuery,
  useUpdateLiveChatClientMutation,
  useDeleteLiveChatClientMutation,
  useCreateUserMutation,
  useSetLcFormMutation,
  useConfirmLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useEditUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation
} = api; 