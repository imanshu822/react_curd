import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import ViewUser from "./ViewUser";
import AddNewUser from "./_addNewUser";
import EditUser from "./_editUser";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // Import confirmDialog

function Users() {
  const [users, setUsersList] = useState([]);
  const [showViewMode, setShowViewMode] = useState(false);
  const [showAddMode, setShowAddMode] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      if (response.status === 200) {
        setUsersList(response.data);
      } else {
        console.error("Error fetching users:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const actionTemplate = (rawData) => {
    return (
      <>
        <button
          className="btn btn-success"
          onClick={() => {
            setSelectedUserId(rawData.id);
            setShowViewMode(true);
          }}
        >
          <i className="pi pi-eye"></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedUserId(rawData.id);
            setShowEditMode(true);
          }}
        >
          <i className="pi pi-file-edit"></i>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteUserConfirm(rawData.id);
          }}
        >
          <i className="pi pi-trash"></i>
        </button>
      </>
    );
  };

  const deleteUserConfirm = (userId) => {
    confirmDialog({
      message: "Are you sure you want to Delete this User ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteUser(userId),
      // reject: () => rejectFunc(),
    });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/users/${userId}`
      );
      if (response.status === 200) {
        getAllUsers();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="users-page">
      <div className="container">
        <h1>Welcome to CRUD Operation using API</h1>
        <h3>We will use React, PrimeReact, json-server, Axios</h3>
        <div className="users-list">
          <div className="addNewUser">
            <button
              className="btn btn-success"
              onClick={() => {
                setShowAddMode(true);
              }}
            >
              Add New User <i className="pi pi-plus"></i>
            </button>
          </div>
          <DataTable value={users}>
            <Column field="name" header="Name"></Column>
            <Column field="username" header="Username"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone No"></Column>
            <Column field="website" header="Website"></Column>
            <Column header="Action" body={actionTemplate}></Column>
          </DataTable>
        </div>
      </div>
      {/* // show user */}
      <Dialog
        header="View User Data"
        visible={showViewMode}
        style={{ width: "70vw" }}
        onHide={() => {
          setShowViewMode(false);
        }}
      >
        <ViewUser userId={selectedUserId} />
      </Dialog>
      <Dialog
        header="Add New User"
        visible={showAddMode}
        style={{ width: "70vw" }}
        onHide={() => {
          setShowAddMode(false);
        }}
      >
        {/* // add new user */}
        <AddNewUser
          setUserAdded={() => {
            setShowAddMode(false);
            getAllUsers();
          }}
        />
      </Dialog>
      <Dialog
        header="Edit Existing User"
        visible={showEditMode}
        style={{ width: "70vw" }}
        onHide={() => {
          setShowEditMode(false);
        }}
      >
        <EditUser
          userId={selectedUserId}
          setUserEdited={() => {
            setShowEditMode(false);
            getAllUsers();
          }}
        />
      </Dialog>
      <ConfirmDialog />
    </div>
  );
}

export default Users;
