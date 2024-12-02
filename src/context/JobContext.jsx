import React, { createContext, useState, useContext } from "react";

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
