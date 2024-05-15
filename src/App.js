import { useCallback, useRef, useState } from "react";
import "./App.css";
import { useGetJobsQuery } from "./slices/jobApiSlice";
import JobCard from "./components/JobCard";

const App = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetJobsQuery(page);
  const jobs = data?.jdList ?? [];
  const observer = useRef();

  // Infinite scrolling using Intersection Observer
  const lastJobElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          jobs.length < (data?.totalCount ?? 0)
        ) {
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [page, isFetching, jobs.length, data?.totalCount]
  );

  return (
    <div className="App">
      {jobs.length <= 0 && !isFetching ? (
        <div ref={lastJobElementRef}>
          <h1>Oops...No jobs found !!</h1>
        </div>
      ) : (
        <div>
          {jobs.map((job, i) => {
            return (
              <div ref={lastJobElementRef}>
                <JobCard job={job} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
