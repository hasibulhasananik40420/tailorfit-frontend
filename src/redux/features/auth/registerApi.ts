import { baseApi } from "../../api/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(userInfo)=>({
                url:'/user/create-user',
                method:'POST',
                body:userInfo
            })
        })
    })
})

export const {useRegisterMutation} = authApi