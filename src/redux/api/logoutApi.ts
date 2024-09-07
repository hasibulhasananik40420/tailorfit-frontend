import { tagTypes } from "../features/tag-types"
import { baseApi } from "./baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        userLogout:builder.mutation({
            query:()=>({
                url:`/auth/logout`,
                method:'POST',
                // body:userInfo
            }),
            invalidatesTags:[tagTypes.userLogout]
        }),


       
    })
})

export const {useUserLogoutMutation} = authApi