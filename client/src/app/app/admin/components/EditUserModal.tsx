import React, { useEffect } from "react";
import ModalWrapper from "../../components/ModalWrapper";
import { User, UserCreate } from "@/app/types";
import { toastError } from "@/app/toasts";

interface Props {
  user: User | null;
  showModal: boolean;
  closeModal: () => void;
  handleCreateUser: (user: UserCreate) => void;
  handleUpdateUser: (user: UserCreate, userId: number) => void;
}

const EditUserModal = (props: Props) => {
  const {
    user: userIn,
    closeModal,
    showModal,
    handleCreateUser,
    handleUpdateUser,
  } = props;
  const [user, setUser] = React.useState<UserCreate>(
    userIn || {
      email: "",
      full_name: "",
      is_superuser: false,
      password: "",
    }
  );

  const reset = () => {
    setUser({
      email: "",
      full_name: "",
      is_superuser: false,
      password: "",
    });
  };

  useEffect(() => {
    setUser(
      userIn || {
        email: "",
        full_name: "",
        is_superuser: false,
        password: "",
      }
    );
  }, [userIn]);

  const isEditing = !!userIn;

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        handleUpdateUser(user, userIn?.id);
      } else {
        handleCreateUser(user);
      }
      closeModal();
    } catch (error) {
      console.error(error);
      toastError("Failed to create user");
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
            {isEditing ? "Edit" : "Create"} User {userIn?.id}
          </span>
        </div>
        <div className="flex flex-col w-full">
          <label>Email</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Full Name</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            value={user.full_name}
            onChange={(e) => setUser({ ...user, full_name: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Superuser</label>
          <select
            className="border border-gray-300 rounded p-2 w-full"
            value={user.is_superuser.toString()}
            onChange={(e) =>
              setUser({ ...user, is_superuser: e.target.value === "true" })
            }
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label>Initial Password</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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

export default EditUserModal;
