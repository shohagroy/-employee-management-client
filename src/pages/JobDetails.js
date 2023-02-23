import React from "react";

import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import {
  useApplyJobMutation,
  useGetJobByIdQuery,
  useQuestionJobsMutation,
  useReplyQuestionMutation,
} from "../features/jobs/jobApi";
import { useParams } from "react-router-dom";
import Loading from "../components/reusable/Loading";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(id, { pollingInterval: 3000 });
  const [questionJobs] = useQuestionJobsMutation();
  const { user } = useSelector((state) => state.auth);
  const [applyJob, { isLoading: loading }] = useApplyJobMutation();
  const [replyQuestion] = useReplyQuestionMutation();

  if (isLoading) {
    return <Loading />;
  }
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    applicants,
    authorEmail,
  } = data.data;

  const handelApply = () => {
    if (user.role === "candidate") {
      const data = {
        jobId: _id,
        email: user?.email,
        userId: user._id,
        user: user.firstName + " " + user.lastName,
        authorEmail,
        position,
      };
      applyJob(data).then((res) => {
        if (res.data.data.modifiedCount) {
          toast.success("Apply Success!");
        }
      });
    } else {
      toast.error("You Need to Candidate Account for Job Apply!");
    }
  };

  const questionHandelar = (e) => {
    e.preventDefault();

    const question = e.target.question.value;
    const data = {
      question,
      jobId: _id,
      email: user.email,
      userId: user._id,
      userName: user.firstName + " " + user.lastName,
    };

    questionJobs(data).then((res) => {
      if (res.data.status) {
        e.target.question.value = "";
      }
    });
  };

  const questionReplyHandelar = (e, id) => {
    e.preventDefault();
    const reply = e.target.reply.value;
    const data = { userId: id, reply };
    replyQuestion(data).then((res) => {
      if (res.data.status) {
        e.target.reply.value = "";
      }
    });
  };

  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            {applicants?.find(
              (applicant) => applicant.email === user?.email
            ) ? (
              <button disabled className="btn">
                Already Apply
              </button>
            ) : (
              <button onClick={handelApply} className="btn">
                {loading ? "Loading..." : "Apply"}
              </button>
            )}
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills.map((skill) => (
                <li key={skill} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.data?.map((skill) => (
                <li key={skill} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li key={skill} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h1>

            <div className="text-primary my-2">
              {queries?.map(({ question, userName, reply, id }) => (
                <div key={question} className="leading-none">
                  <small>{userName}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 relative left-5"
                    >
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {user?.role === "employer" && (
                    <form onSubmit={(e) => questionReplyHandelar(e, id)}>
                      <div className="flex gap-3 my-5">
                        <input
                          placeholder="Reply"
                          type="text"
                          className="w-full"
                          required
                          name="reply"
                        />
                        <button
                          className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                          type="submit"
                        >
                          <BsArrowRightShort size={30} />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>

            {user.role === "candidate" && (
              <form onSubmit={(e) => questionHandelar(e)}>
                <div className="flex gap-3 my-5">
                  <input
                    required
                    placeholder="Ask a question..."
                    type="text"
                    name="question"
                    className="w-full"
                  />
                  <button
                    className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                    type="submit"
                  >
                    <BsArrowRightShort size={30} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-lg">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className="font-semibold text-lg" href="/">
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
