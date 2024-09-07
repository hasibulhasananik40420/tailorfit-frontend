/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

export type Measurement = {
  label: string;
  text: string;
};

export type LugeSize = {
  label: string;
  text: string;
};

export type TStyle = {
  isActive: boolean;
  text: string;
};

export type TDropDownItem = {
  isActive: boolean;
  label: string;
};

export type TDropDownStyle = {
  header: string;
  item: TDropDownItem[];
};

export type TIndividualOrderItem = {
  styles?: any;
  measurements?: any;
  looseItems?: any;
  isOpen?: boolean;
  category: string;
  image: string;
  measurement: Measurement[];
  lugeSize: LugeSize[];
  style: TStyle[];
  subCategories?: TStyle[];
  dropDownStyle: TDropDownStyle[];
  quantity: number;
  note: string;
};

export type TIndividualOrder = {
  _id?: string;
  urgentOrder : boolean;
  admin?: string;
  customerName?: string;
  address?: string;
  folder?: string;
  industry?: string | boolean;
  orderId: string | number | undefined;
  phoneNumber?: string;
  orderStatus?: string;
  orderBGColor?: string;
  createdAt?: string;
  tryerDate?: Date | null;
  orderDate?: Date | null;
  deliveryDate?: Date | null;
  formattedTryerDate?: string | null;
  formattedDeliveryDate?: string | null;
  item?: TIndividualOrderItem[];
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create individual order
    createIndividualOrder: builder.mutation({
      query: (data) => ({
        url: `/individual-order/create-individual-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.individualOrder],
    }),

    //get individual orders
    getIndividualOrders: builder.query({
      query: (query) => ({
        url: `/individual-order/my-individual-orders?adminId=${query?.adminId}&searchTerm=${query?.searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.individualOrder],
    }),

    //get individual order
    getIndividualOrder: builder.query({
      query: (id) => ({
        url: `/individual-order/my-individual-order/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.individualOrder],
    }),
    //get individual orders by phone number
    myIndividualOrdersByPhone: builder.query({
      query: (id) => ({
        url: `/individual-order/my-individual-orders-phone/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.individualOrder],
    }),

    //get individual order
    getIndividualLastOrder: builder.query({
      query: (id) => ({
        url: `/individual-order/my-individual-last-order/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.individualOrder],
    }),

    //edit individual order
    editIndividualOrder: builder.mutation({
      query: (data) => ({
        url: `/individual-order/update-individual-order`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.individualOrder],
    }),

    //delete individual order
    deleteIndividualOrder: builder.mutation({
      query: (id) => ({
        url: `/individual-order/delete-individual-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.individualOrder],
    }),
  }),
});

export const {
  useCreateIndividualOrderMutation,
  useGetIndividualOrdersQuery,
  useGetIndividualLastOrderQuery,
  useGetIndividualOrderQuery,
  useMyIndividualOrdersByPhoneQuery,
  useEditIndividualOrderMutation,
  useDeleteIndividualOrderMutation,
} = authApi;
