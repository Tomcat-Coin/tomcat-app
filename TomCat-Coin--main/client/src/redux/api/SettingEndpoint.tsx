import BaseApi from "./BaseApi";

const SettingEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        LoginBySceret: builder.mutation({
            query: (arg) => ({
                url: "/setting/admin/login/auth/0/login",
                body: { secret: arg },
                method: "POST"
            })
        })
    })
});

export const { useLoginBySceretMutation } = SettingEndpoint;