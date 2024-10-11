import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseApi = createApi({
    reducerPath: 'api',
    tagTypes: ["Farming", "User", "admin_user", "admin_task", "task", "extra_task"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.MODE === "development" ? import.meta.env.VITE_SERVER_DEV : import.meta.env.VITE_SERVER_LIVE,
        prepareHeaders(headers) {
            const token = sessionStorage.getItem('token');

            headers.set('Authorization', token as string)
        },
    }),
    endpoints: () => ({}),

});

export default BaseApi;