import { tagTypes } from "../features/tag-types"
import { baseApi } from "./baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createSetting:builder.mutation({
            query:(userInfo)=>({
                url:`/settings/add-settings`,
                method:'POST',
                body:userInfo
            }),
            invalidatesTags:[tagTypes.createSetting]
        }),


         //get setting 

         getSettingData:builder.query({
            query:(admin)=>({
                url:`/settings/my-settings/${admin}`,
                method:'GET',
            }),
            providesTags:[tagTypes.createSetting]
        }),

    })
})

export const {useCreateSettingMutation, useGetSettingDataQuery} = authApi