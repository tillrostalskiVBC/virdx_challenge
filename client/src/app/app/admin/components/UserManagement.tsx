import useUsers from "@/app/hooks/useUsers";
import { formatDate } from "@/app/utils/dateUtils";
import React, { Fragment, useState } from "react";
import EditUserModal from "./EditUserModal";
import { User, UserCreate } from "@/app/types";
import { apiUrl } from "@/app/constants";
import { fetcher } from "@/app/fetcher";
import { toastError, toastSuccess } from "@/app/toasts";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const UserManagement = () => {
  const { data, isLoading, error, mutate } = useUsers();
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  if (isLoading) return null;

  const handleCreateUser = async (user: UserCreate) => {
    const response = await fetcher(apiUrl + "/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    mutate();
    toastSuccess("User created");
  };

  const handleUpdateUser = async (user: UserCreate, userId: number) => {
    const response = await fetcher(apiUrl + `/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
    mutate();
    toastSuccess("User updated");
  };

  const handleDeleteUser = async (userId: number) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try {
      const response = await fetcher(apiUrl + `/users/${userId}`, {
        method: "DELETE",
      });
      mutate();
      toastSuccess("User deleted");
    } catch (error) {
      console.error(error);
      toastError("Failed to delete user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button
          className="bg-primary-color hover:secondary-color text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setEditUser(null);
            setShowEditUserModal(true);
          }}
        >
          Create User
        </button>
      </div>
      <div className="overflow-x-auto">
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
            {data?.map((user) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={user.id}
              >
                <td className="py-4 px-6">{user.id}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.full_name}</td>
                <td className="py-4 px-6">{formatDate(user.created_at)}</td>
                <td className="py-4 px-6">
                  {user.is_superuser ? "Yes" : "No"}
                </td>
                <td className="py-4 px-6 flex gap-2 items-center">
                  <button
                    className="text-primary-color hover:text-secondary-color"
                    onClick={() => {
                      setEditUser(user);
                      setShowEditUserModal(true);
                    }}
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
      </div>
      <EditUserModal
        user={editUser}
        handleCreateUser={handleCreateUser}
        handleUpdateUser={handleUpdateUser}
        showModal={showEditUserModal}
        closeModal={() => setShowEditUserModal(false)}
      />
    </div>
  );
};

export default UserManagement;
