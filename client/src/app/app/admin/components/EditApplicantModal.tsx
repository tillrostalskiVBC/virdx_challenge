import React, { useEffect } from "react";
import ModalWrapper from "../../components/ModalWrapper";
import { Applicant, ApplicantCreate } from "@/app/types";
import { toastError } from "@/app/toasts";

interface Props {
  applicant: Applicant | null;
  showModal: boolean;
  closeModal: () => void;
  handleCreateApplicant: (applicant: ApplicantCreate) => void;
  handleUpdateApplicant: (
    applicant: ApplicantCreate,
    applicantId: number
  ) => void;
}

const EditapplicantModal = (props: Props) => {
  const {
    applicant: applicantIn,
    closeModal,
    showModal,
    handleCreateApplicant: handleCreateApplicant,
    handleUpdateApplicant: handleUpdateApplicant,
  } = props;
  const [applicant, setApplicant] = React.useState<ApplicantCreate>(
    applicantIn || {
      github_name: "",
      full_name: "",
      repo_link: "",
    }
  );

  useEffect(() => {
    setApplicant(
      applicantIn || {
        full_name: "",
        github_name: "",
        repo_link: "",
      }
    );
  }, [applicantIn]);

  const reset = () => {
    setApplicant({
      github_name: "",
      repo_link: "",
      full_name: "",
    });
  };

  const isEditing = !!applicantIn;

  const handleSubmit = async () => {
    if (
      !applicant.full_name ||
      !applicant.github_name ||
      !applicant.repo_link
    ) {
      toastError("Please fill in all fields");
      return;
    }

    try {
      if (isEditing) {
        await handleUpdateApplicant(applicant, applicantIn?.id);
      } else {
        await handleCreateApplicant(applicant);
      }
      reset();
      closeModal();
    } catch (error) {
      console.error(error);
      toastError(
        "Failed to create applicant, maybe the github name is already taken?"
      );
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <ModalWrapper closeModal={closeModal} isOpen={showModal}>
      <div className="flex flex-col w-full px-4 py-2 gap-2">
        <div>
          <span className="text-xl font-semibold">
            {isEditing ? "Edit" : "Create"} Applicant {applicantIn?.id}
          </span>
        </div>
        <div className="flex flex-col w-full">
          <label>Full Name</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            value={applicant.full_name}
            onChange={(e) =>
              setApplicant({ ...applicant, full_name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full">
          <label>GitHub</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            value={applicant.github_name}
            onChange={(e) =>
              setApplicant({ ...applicant, github_name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Repo Link</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            value={applicant.repo_link}
            onChange={(e) =>
              setApplicant({ ...applicant, repo_link: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row w-full justify-end gap-2">
          <button
            className="bg-cancel-button-color p-2 rounded text-white transition hover:bg-hover-cancel-button-color"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-primary-color p-2 rounded text-white transition hover:bg-secondary-color"
            onClick={handleSubmit}
          >
            {isEditing ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditapplicantModal;
