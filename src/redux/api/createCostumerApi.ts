import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

export type TCostumer = {
  _id?: string;
  admin?: string;
  customerName?: string;
  institutionName?: string;
  industry?: string;
  address?: string;
  phoneNumber: string;
  createdAt: Date;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCostumer: builder.mutation({
      query: (userInfo) => ({
        url: "/costumer/create-costumer",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.createCostumer],
    }),

    //get costumer

    getCostumers: builder.query({
      query: (admin) => ({
        url: `costumer/my-costumers/${admin}`,
        method: "GET",
      }),
      providesTags: [tagTypes.createCostumer],
    }),

    getCostumer: builder.query({
      query: (id) => ({
        url: `costumer/my-costumer/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.createCostumer],
    }),

    deleteCostumer: builder.mutation({
      query: (id) => ({
        url: `costumer/delete-costumer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.createCostumer],
    }),
    editCostumer: builder.mutation({
      query: (body) => {
        console.log("Body data:", body);

        return {
          url: `costumer/edit-costumer`,
          method: "PUT",
          body: body, // or simply `body,` since the property and value names are the same
        };
      },
      invalidatesTags: [tagTypes.createCostumer],
    }),

    // deleteCostumer: builder.mutation({
    //   query: (id) => ({
    //     url: `costumer/delete-costumer/${id}`,
    //     method: "DELETE",
    //   }),

    //   invalidatesTags: [tagTypes.createCostumer],
    // }),
  }),
});

export const {
  useCreateCostumerMutation,
  useGetCostumersQuery,
  useGetCostumerQuery,
  useDeleteCostumerMutation,
  useEditCostumerMutation,
} = authApi;
