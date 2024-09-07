import { baseApi } from "../../api/baseApi"
import { tagTypes } from "../tag-types"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        updateProfile:builder.mutation({
            query:(userInfo)=>({
                url:'/user/update',
                method:'PATCH',
               
                body:userInfo
              
            }),

            invalidatesTags:[tagTypes.updateProfile]
        })
    })
})

export const {useUpdateProfileMutation} = authApi

