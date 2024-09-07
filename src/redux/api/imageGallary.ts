import { tagTypes } from "../features/tag-types"
import { baseApi } from "./baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createGallary:builder.mutation({
            query:(userInfo)=>({
                url:`/gallery/create-gallery`,
                method:'POST',
                body:userInfo
            }),
            invalidatesTags:[tagTypes.createGallary]
        }),


         //get costumer 

        //  getCostumer:builder.query({
        //     query:(admin)=>({
        //         url:`costumer/my-costumers/${admin}`,
        //         method:'GET',
        //     }),
        //     providesTags:[tagTypes.createCostumer]
        // }),

    })
})

export const {useCreateGallaryMutation} = authApi