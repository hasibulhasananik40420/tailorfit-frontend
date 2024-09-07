import { baseApi } from "../../api/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        forget:builder.mutation({
            query:(data)=>({
                url:'/auth/forget-password',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useForgetMutation} = authApi