import { Applicant } from "@/app/types";
import { formatDate } from "@/app/utils/dateUtils";
import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface Props {
  data: Applicant[];
  handleEditApplicant: (applicant: Applicant) => void;
  handleDeleteApplicant: (applicantId: number) => Promise<void>;
}

const ApplicantTable = (props: Props) => {
  const { data, handleEditApplicant, handleDeleteApplicant } = props;
  return (
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr className="text-left border-b border-gray-200">
          <th className="py-2 px-4">ID</th>
          <th className="py-2 px-4">Full Name</th>
          <th className="py-2 px-4">GitHub</th>
          <th className="py-2 px-4">Repo Link</th>
          <th className="py-2 px-4">Created</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((applicant) => (
          <tr className="border-b border-gray-200" key={applicant.id}>
            <td className="py-4 px-6">{applicant.id}</td>
            <td className="py-4 px-6">{applicant.full_name}</td>
            <td className="py-4 px-6">{applicant.github_name}</td>
            <td className="py-4 px-6">{applicant.repo_link}</td>
            <td className="py-4 px-6">{formatDate(applicant.created_at)}</td>
            <td className="py-4 px-6 flex gap-2 items-center">
              <button
                className="text-primary-color hover:text-secondary-color"
                onClick={() => handleEditApplicant(applicant)}
              >
                <FaEdit size={20} />
              </button>
              <button
                className="text-cancel-button-color hover:text-hover-cancel-button-color"
                onClick={() => handleDeleteApplicant(applicant.id)}
              >
                <FaRegTrashAlt size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicantTable;
