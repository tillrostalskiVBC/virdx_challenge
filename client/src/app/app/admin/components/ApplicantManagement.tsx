import React, { useState } from "react";
import { Applicant, ApplicantCreate } from "@/app/types";
import { apiUrl } from "@/app/constants";
import { fetcher } from "@/app/fetcher";
import { toastError, toastSuccess } from "@/app/toasts";
import useApplicants from "@/app/hooks/useApplicants";
import ApplicantTable from "./ApplicantTable";
import EditapplicantModal from "./EditApplicantModal";

const ApplicantManagement = () => {
  const {
    data: applicants,
    isLoading: applicantsIsLoading,
    error: applicantsError,
    mutate: applicantsMutate,
  } = useApplicants();

  const [showEditApplicantModal, setShowEditApplicantModal] = useState(false);
  const [editApplicant, setEditApplicant] = useState<Applicant | null>(null);

  const handleEditApplicant = (applicant: Applicant) => {
    setEditApplicant(applicant);
    setShowEditApplicantModal(true);
  };

  const handleCreateApplicant = async (applicant: ApplicantCreate) => {
    const response = await fetcher(apiUrl + "/applicants", {
      method: "POST",
      body: JSON.stringify(applicant),
    });
    applicantsMutate();
    toastSuccess("Applicant created");
  };

  const handleUpdateApplicant = async (
    applicant: ApplicantCreate,
    applicantId: number
  ) => {
    const response = await fetcher(apiUrl + `/applicants/${applicantId}`, {
      method: "PUT",
      body: JSON.stringify(applicant),
    });
    applicantsMutate();
    toastSuccess("Applicant updated");
  };

  const handleDeleteApplicant = async (applicantId: number) => {
    const confirmed = confirm(
      "Are you sure you want to delete this applicant?"
    );
    if (!confirmed) return;
    try {
      const response = await fetcher(apiUrl + `/applicants/${applicantId}`, {
        method: "DELETE",
      });
      applicantsMutate();
      toastSuccess("Applicants deleted");
    } catch (error) {
      console.error(error);
      toastError("Failed to delete applicant");
    }
  };

  if (applicantsIsLoading) return null;

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Applicants</h2>
          <button
            className="bg-primary-color hover:secondary-color text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setEditApplicant(null);
              setShowEditApplicantModal(true);
            }}
          >
            Create Applicant
          </button>
        </div>
        <div className="overflow-x-auto">
          {!applicants || applicants.length === 0 ? (
            <div className="text-center text-xl text-gray-400">
              No applicants found
            </div>
          ) : (
            <ApplicantTable
              data={applicants}
              handleDeleteApplicant={handleDeleteApplicant}
              handleEditApplicant={handleEditApplicant}
            />
          )}
        </div>
      </div>
      <EditapplicantModal
        applicant={editApplicant}
        handleCreateApplicant={handleCreateApplicant}
        handleUpdateApplicant={handleUpdateApplicant}
        showModal={showEditApplicantModal}
        closeModal={() => setShowEditApplicantModal(false)}
      />
    </div>
  );
};

export default ApplicantManagement;
