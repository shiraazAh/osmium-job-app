import React, { createContext, useState, useContext } from "react";

const JobContext = createContext(null);

export const JobProvider = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
};
