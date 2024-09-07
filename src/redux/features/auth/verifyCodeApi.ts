import { baseApi } from "../../api/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        verifyCode:builder.mutation({
            query:(data)=>({
                url:'/auth/verification',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useVerifyCodeMutation} = authApi