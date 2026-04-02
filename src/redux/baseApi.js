import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth.js";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "GetAllEvents",
    "GetAllActivities",
    "GetShopProducts",
    "UserProfile",
    "Conversations",
    "Messages",
    "GroupConversations",
    "Subscription",
  ],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
