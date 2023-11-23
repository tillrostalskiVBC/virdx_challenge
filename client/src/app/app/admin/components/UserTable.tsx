import { User } from "@/app/types";
import { formatDate } from "@/app/utils/dateUtils";
import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface Props {
  data: User[];
  handleEditUser: (user: User) => void;
  handleDeleteUser: (userId: number) => Promise<void>;
}

const UserTable = (props: Props) => {
  const { data, handleEditUser, handleDeleteUser } = props;
  return (
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr className="text-left border-b border-gray-200">
          <th className="py-2 px-4">ID</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Full Name</th>
          <th className="py-2 px-4">Created</th>
          <th className="py-2 px-4">Superuser</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data
          ?.sort((a, b) => a.id < b.id ? -1 : 1)
          .map((user) => (
            <tr className="border-b border-gray-200" key={user.id}>
              <td className="py-4 px-6">{user.id}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.full_name}</td>
              <td className="py-4 px-6">{formatDate(user.created_at)}</td>
              <td className="py-4 px-6">{user.is_superuser ? "Yes" : "No"}</td>
              <td className="py-4 px-6 flex gap-2 items-center">
                <button
                  className="text-primary-color hover:text-secondary-color"
                  onClick={() => handleEditUser(user)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-cancel-button-color hover:text-hover-cancel-button-color"
                  onClick={() => handleDeleteUser(user.id)}
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

export default UserTable;
