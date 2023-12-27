import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";

function ViewUser(props) {
  const initialUserInfo = {
    name: "",
    userName: "",
    email: "",
    phone: "",
    website: "",
    address: {
      city: "",
      street: "",
      suite: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/users/" + props.userId
      );
      if (response.status === 200) {
        console.log(response.data);
        setUserInfo(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="user-view">
      <h1>Basic Info </h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Full Name: </span>
              <span>{userInfo.name}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span> Username: </span>
              <span>{userInfo.username}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Email Address: </span>
              <span>{userInfo.email}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Phone Number: </span>
              <span>{userInfo.phone}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span> Website: </span>
              <span>{userInfo.website}</span>
            </p>
          </div>
        </div>
      </div>
      <h1>User Address </h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>City: </span>
              <span>{userInfo.address.city}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span> Street: </span>
              <span>{userInfo.address.street}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Suite: </span>
              <span>{userInfo.address.suite}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Zipcode: </span>
              <span>{userInfo.address.zipcode}</span>
            </p>
          </div>
        </div>
      </div>
      <h1>User Company </h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Company Name: </span>
              <span>{userInfo.company.name}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span> Catch Phrase: </span>
              <span>{userInfo.company.catchPhrase}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>BS: </span>
              <span>{userInfo.company.bs}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
