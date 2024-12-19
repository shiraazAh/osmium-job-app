import React from "react";
import ConfirmModal from "../components/Modals/DeleteModal";
import JobPagination from "../components/JobPagination";

export default function ComponentsPage() {
  return (
    <>
      <div>This is Components Page</div>
      <ConfirmModal />
      <JobPagination />
    </>
  );
}
