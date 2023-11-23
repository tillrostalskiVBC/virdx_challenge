import useUsers from "@/app/hooks/useUsers";
import React, { useState } from "react";
import EditUserModal from "./EditUserModal";
import { User, UserCreate } from "@/app/types";
import { apiUrl } from "@/app/constants";
import { fetcher } from "@/app/fetcher";
import { toastError, toastSuccess } from "@/app/toasts";
import UserTable from "./UserTable";
import useApplicants from "@/app/hooks/useApplicants";
import { TabBar } from "../../components/TabBar";

const UserManagement = () => {
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
    mutate: usersMutate,
  } = useUsers();

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setShowEditUserModal(true);
  };

  const handleCreateUser = async (user: UserCreate) => {
    const response = await fetcher(apiUrl + "/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    usersMutate();
    toastSuccess("User created");
  };

  const handleUpdateUser = async (user: UserCreate, userId: number) => {
    const response = await fetcher(apiUrl + `/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
    usersMutate();
    toastSuccess("User updated");
  };

  const handleDeleteUser = async (userId: number) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try {
      const response = await fetcher(apiUrl + `/users/${userId}`, {
        method: "DELETE",
      });
      usersMutate();
      toastSuccess("User deleted");
    } catch (error) {
      console.error(error);
      toastError("Failed to delete user");
    }
  };

  if (usersIsLoading) return null;

  return (
    <div className="">
      <div className="">
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
        <div className="">
          {!users || users.length === 0 ? (
            <div className="text-center text-xl text-gray-400">
              No users found
            </div>
          ) : (
            <UserTable
              data={users}
              handleDeleteUser={handleDeleteUser}
              handleEditUser={handleEditUser}
            />
          )}
        </div>
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
