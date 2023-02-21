import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobByIdQuery, useGetJobsQuery } from "../features/jobs/jobApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();

  const { data: job } = useGetJobByIdQuery("63f393d06071fff48a821f64");

  console.log(job);

  if (isLoading) {
    return <h2 className="text-center font-2xl font-bold">Loading...</h2>;
  }

  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
