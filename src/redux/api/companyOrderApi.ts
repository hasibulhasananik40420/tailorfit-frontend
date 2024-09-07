import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create indistry order
    createCompanyOrder: builder.mutation({
      query: (data) => ({
        url: `/industry-order/create-industry-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.companyOders],
    }),

    //get \indistry orders
    getCompanyOrders: builder.query({
      query: (query) => ({
        url: `/industry-order/my-industry-orders?adminId=${query?.adminId}&searchTerm=${query?.searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyOders],
    }),

    //get individual order
    getCompanyLastOrder: builder.query({
      query: (id) => ({
        url: `/industry-order/industry-laster-order/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyOders],
    }),

    myIndustryOrdersByPhone: builder.query({
      query: (id) => ({
        url: `/industry-order/my-industry-orders-phone/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyOders],
    }),

    getCompanyOrder: builder.query({
      query: (id) => ({
        url: `/industry-order/industry-order/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyOders],
    }),

    // get company order
    getCompanyFolder: builder.query({
      query: (id) => ({
        url: `/industry-order/my-industry-folder/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyOders],
    }),

    // get company order
    getCompanyOders: builder.query({
      query: (data) => ({
        url: `/industry-order/my-industry-orders/?adminId=${data?.id}&industry=${data?.industry}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyOders],
    }),

    //edit folder name
    editFolderName: builder.mutation({
      query: (data) => ({
        url: `/industry-order/edit-industry-folder`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.companyOders],
    }),

    //edit comapny order
    editCompanyOrder: builder.mutation({
      query: (data) => ({
        url: `/industry-order/update-industry-order`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.companyOders],
    }),

    // delete compant order
    deleteCompanyOrder: builder.mutation({
      query: (id) => ({
        url: `industry-order/delete-industry-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.companyOders],
    }),

    // delete compant order
    deleteFolderOrder: builder.mutation({
      query: (industry) => ({
        url: `/industry-order/delete-industry-orders/${industry}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.companyOders],
    }),
  }),
});

export const {
  useCreateCompanyOrderMutation,
  useGetCompanyOrderQuery,
  useGetCompanyOrdersQuery,
  useGetCompanyLastOrderQuery,
  useDeleteFolderOrderMutation,
  useEditFolderNameMutation,
  useGetCompanyFolderQuery,
  useGetCompanyOdersQuery,
  useMyIndustryOrdersByPhoneQuery,
  useEditCompanyOrderMutation,
  useDeleteCompanyOrderMutation,
} = authApi;
