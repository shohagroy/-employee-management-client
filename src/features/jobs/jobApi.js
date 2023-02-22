import apiSlice from "../apiSlice/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/job",
        body: data,
      }),
      invalidatesTags: ["Jobs", "Job"],
    }),
    getJobs: builder.query({
      query: () => ({
        method: "GET",
        url: "/jobs",
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/job/${id}`,
      }),
      providesTags: ["Jobs", "Job"],
    }),
    getJobByEmail: builder.query({
      query: (email) => ({
        method: "GET",
        url: `/postJob/${email}`,
      }),
      providesTags: ["Job"],
    }),
    deleteJobById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/job/${id}`,
      }),
      invalidatesTags: ["Job"],
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/apply",
        body: data,
      }),
      invalidatesTags: ["Jobs", "Job"],
    }),

    appliedJobs: builder.query({
      query: (email) => ({
        method: "GET",
        url: `/applied-jobs/${email}`,
      }),
      providesTags: ["Jobs", "Job"],
    }),
    cancelApply: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: `/cancel-apply`,
        body: data,
      }),
      invalidatesTags: ["Jobs", "Job"],
    }),
    questionJobs: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: `/query`,
        body: data,
      }),
      invalidatesTags: ["Jobs", "Job"],
    }),
    replyQuestion: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: `/reply`,
        body: data,
      }),
      invalidatesTags: ["Jobs", "Job"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetJobByEmailQuery,
  useDeleteJobByIdMutation,
  useApplyJobMutation,
  useAppliedJobsQuery,
  useCancelApplyMutation,
  useQuestionJobsMutation,
  useReplyQuestionMutation,
} = jobApi;
