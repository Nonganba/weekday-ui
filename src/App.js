import { useCallback, useRef, useState } from "react";
import "./App.css";
import { useGetJobsQuery } from "./slices/jobApiSlice";
import JobCard from "./components/JobCard";
import { Stack } from "@mui/material";
import Filter from "./components/Filter";

const App = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetJobsQuery(page);
  const jobs = data?.jdList ?? [];
  const observer = useRef();

  const [filters, setFilters] = useState({
    minExp: "",
    companyName: "",
    location: "",
    jobRole: "",
    techStack: "",
    minJdSalary: "",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.minExp === "" || job.minExp == filters.minExp) &&
      (filters.companyName === "" ||
        job.companyName.toLowerCase() === filters.companyName.toLowerCase()) &&
      (filters.location === "" ||
        job.location.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.minJdSalary === "" || job.minJdSalary == filters.minJdSalary) &&
      (filters.jobRole === "" ||
        job.jobRole.toLowerCase() === filters.jobRole.toLowerCase())
    );
  });

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
      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowY: "auto",
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: "white",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      >
        <Filter
          filterName="Roles"
          filterType="jobRole"
          handleFilterChange={handleFilterChange}
        />
        <Filter
          filterName="Number of Employees"
          handleFilterChange={handleFilterChange}
        />
        <Filter
          filterName="Experience"
          filterType="minExp"
          handleFilterChange={handleFilterChange}
        />
        <Filter
          filterName="Remote"
          filterType="location"
          handleFilterChange={handleFilterChange}
        />
        <Filter
          filterName="Minimum Base Pay Salary"
          filterType="minJdSalary"
          handleFilterChange={handleFilterChange}
        />
        <Filter
          filterName="Search Company Name"
          filterType="companyName"
          inputType="text"
          handleFilterChange={handleFilterChange}
        />
      </Stack>
      {jobs.length <= 0 && !isFetching ? (
        <div ref={lastJobElementRef}>
          <h1>Oops...No jobs found !!</h1>
        </div>
      ) : (
        <div>
          {filteredJobs.map((job, i) => {
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
