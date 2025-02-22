import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvent, IEvents } from "./interfaces/events";
import {
  IAddLiveChatClientRes,
  IDeleteLiveChatClientRes,
  IGetLiveChatClientByCodeRes,
  IGetLiveChatClientDataRes,
  IGetLiveChatClientRes,
  ILiveChatClient,
  ILiveChatClientReq,
  IUpdateClientReq,
  IUpdateLiveChatClientRes,
} from "./interfaces/liveChatClient";
import { IUploadFile } from "./interfaces/upload";
import {
  IConfirmDataLogin,
  IConfirmLoginResSuccess,
  ICreateUserResSuccess,
  IDeleteUserResSuccess,
  IEditDataUser,
  IEditUserResSuccess,
  IGetMeResSuccess,
  ILoginDataUser,
  ILoginDataUserReq,
  ILoginUserResSuccess,
  IRegDataUser,
  ISetLcData,
  ISetLcResSuccess,
} from ".";
import {
  IAddLiveChatClientChildrenBulkRes,
  ILiveChatClientChildren,
} from "./interfaces/liveChatClientChildren";

export const api = createApi({
  reducerPath: "strapiApi",
  tagTypes: ["MeData"],
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (build) => ({
    getEvents: build.query<Array<IEvent>, void>({
      query: () => ({
        url: "events",
      }),
      transformResponse: (response: IEvents) => response.data,
    }),
    uploadImage: build.mutation<Array<IUploadFile>, FileList>({
      query: (files) => {
        let bodyFormData = new FormData();
        for (let i = 0; i < files.length; i++) {
          bodyFormData.append("files", files[i]);
        }
        return {
          url: "upload",
          method: "POST",
          body: bodyFormData,
          formData: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          },
        };
      },
    }),
    addLiveChatClient: build.mutation<
      IAddLiveChatClientRes,
      ILiveChatClientReq
    >({
      query: (data) => {
        return {
          url: "live-chat-clients",
          method: "POST",
          body: {
            data,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          },
        };
      },
    }),
    addLiveChatClientChildrenBulk: build.mutation<
      IAddLiveChatClientChildrenBulkRes,
      ILiveChatClientChildren[]
    >({
      query: (data) => ({
        url: "live-chat-client-children/bulk",
        method: "POST",
        body: {
          data,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
    }),
    updateLiveChatClient: build.mutation<
      IUpdateLiveChatClientRes,
      IUpdateClientReq
    >({
      query: (data) => ({
        url: `live-chat-clients/${data.id}`,
        method: "PUT",
        body: {
          data: data.body,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
      invalidatesTags: ["MeData"],
    }),
    deleteLiveChatClient: build.mutation<IDeleteLiveChatClientRes, number>({
      query: (id) => ({
        url: `live-chat-clients/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
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
      transformResponse: (response: IGetLiveChatClientByCodeRes) =>
        response.data?.[0],
    }),
    createUser: build.mutation<ICreateUserResSuccess, IRegDataUser>({
      query: (regData) => ({
        url: `/users`,
        method: "POST",
        body: regData,
      }),
    }),
    loginUser: build.mutation<ILoginUserResSuccess, ILoginDataUserReq>({
      query: (loginData) => ({
        url: `/users-permissions/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["MeData"],
    }),
    editUser: build.mutation<IEditUserResSuccess, IEditDataUser>({
      query: (editData) => ({
        url: `/users-permissions/profile`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: editData,
      }),
      invalidatesTags: ["MeData"],
    }),
    confirmLogin: build.mutation<IConfirmLoginResSuccess, IConfirmDataLogin>({
      query: (confirmData) => ({
        url: `/users-permissions/verify`,
        method: "POST",
        body: confirmData,
      }),
      invalidatesTags: ["MeData"],
    }),
    setLcForm: build.mutation<ISetLcResSuccess, ISetLcData>({
      query: (lcFormData) => ({
        url: `/users-permissions/setLcForm`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: lcFormData,
      }),
      invalidatesTags: ["MeData"],
    }),
    getMe: build.query<IGetMeResSuccess, any>({
      query: () => ({
        url: `/users/me`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
      providesTags: ["MeData"],
    }),
    deleteUser: build.mutation<IDeleteUserResSuccess, void>({
      query: () => ({
        url: `/users-permissions/profile`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      }),
      invalidatesTags: ["MeData"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddLiveChatClientMutation,
  useAddLiveChatClientChildrenBulkMutation,
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
  useDeleteUserMutation,
} = api;
