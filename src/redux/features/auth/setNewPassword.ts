import { baseApi } from "../../api/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        setNewPassword:builder.mutation({
            query:(data)=>({
                url:'/auth/set-new-password',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useSetNewPasswordMutation} = authApi