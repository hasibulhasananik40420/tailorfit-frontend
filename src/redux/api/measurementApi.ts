



import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMeasurement: builder.mutation({
      query: (userInfo) => ({
        url: `/measurement/create-measurement`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.createMeasurement],
    }),

    //get measurement

    getMeasurements: builder.query({
      query: (admin) => ({
        url: `/measurement/my-measurements/${admin}`,
        method: "GET",
      }),
      providesTags: [tagTypes.createMeasurement],
    }),

    getMeasurement: builder.query({
      query: ({ admin, name }) => ({
        url: `/measurement/my-measurement`,
        method: "GET",
        params: { admin, name },
      }),
      providesTags: [tagTypes.createMeasurement],
    }),


    getSingleMeasurement: builder.query({
      query: (id) => ({
        url: `/measurement/measurement/${id}`,
        method: "GET",
        
      }),
      providesTags: [tagTypes.createMeasurement],
    }),


    editMeasurement: builder.mutation({
      query: (userInfo) => ({
        url: `/measurement/update-measurements`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.createMeasurement],
    }),
    deleteMeasurement: builder.mutation({
      query: (mesurementId) => ({
        url: `/measurement/delete-measurement/${mesurementId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.createMeasurement],
    }),
  }),
});

export const { useCreateMeasurementMutation, useGetMeasurementsQuery, useGetMeasurementQuery, useDeleteMeasurementMutation, useEditMeasurementMutation,useGetSingleMeasurementQuery } = authApi;
