import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useAppliedJobsQuery,
  useCancelApplyMutation,
} from "../../features/jobs/jobApi";

const CandidateDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useAppliedJobsQuery(user?.email);

  const [cancelApply, { isLoading, isError }] = useCancelApplyMutation();

  console.log(data);

  const cancelJobHandelar = (id) => {
    const data = { jobId: id, userId: user?._id, email: user.email };

    cancelApply(data).then((res) => {
      if (res.status) {
        toast.success("Applied Job Cancel SuccessFull!");
      }
    });
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      <div className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 w-full justify-between">
        <div className="container py-2 mx-auto sm:p-4 text-primary">
          {data?.data?.length ? (
            <h1 className="w-full text-2xl text-primary mb-5">
              Apply To Jobs - {data?.data?.length}
            </h1>
          ) : (
            <h1 className="w-full text-2xl text-primary mb-5">
              No Apply Jobs Available, Please Apply!
            </h1>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="p-3 w-6"></th>
                  <th className="p-3">Position</th>
                  <th className="p-3">Company Name</th>
                  <th className="p-3">Issued Date</th>
                  <th className="p-3 text-right">Salary</th>
                  <th className="p-3">Apply</th>
                  <th className="p-3"></th>
                  <th className="p-3"></th>
                </tr>
              </thead>

              <tbody>
                {data?.data.map((job, i) => (
                  <tr
                    key={job?._id}
                    className="border-b border-opacity-20 border-primary bg-white"
                  >
                    <th>{i + 1}.</th>
                    <td className="p-3">
                      <p>{job?.position}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.companyName}</p>
                    </td>
                    <td className="p-3">
                      <p>{new Date(job?.issueDate).toDateString()}</p>
                    </td>
                    <td className="p-3 text-right">
                      <p>{job?.salaryRange}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.applicants?.length} Apply</p>
                      <p className="text-gray-400">
                        {job?.queries?.length} Comment
                      </p>
                    </td>

                    <td className="p-3 text-right">
                      <Link
                        to={`/job-details/${job?._id}`}
                        className="px-3 py-1 font-semibold mr-2 rounded-md bg-green-600 text-white"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => cancelJobHandelar(job?._id)}
                        className="px-3 py-1 font-semibold rounded-md bg-red-600 text-white"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
