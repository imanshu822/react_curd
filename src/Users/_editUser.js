import React, { useEffect, useState } from "react";
import axios from "axios";

const initialUserInfo = {
  id: "",
  name: "",
  username: "",
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

function EditUser(props) {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  useEffect(() => {
    // You should set the user ID initially and then fetch user data
    setUserInfo({ ...userInfo, id: props.userId });
    fetchUserData();
  }, [props.userId]); // Make sure to include props.userId as a dependency

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users/${props.userId}` // Use template literals for cleaner URL
      );
      if (response.status === 200) {
        console.log(response.data);
        setUserInfo(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editExitUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/users/${props.userId}`, // Update the URL to include the user ID
        userInfo // Send userInfo as the request body
      );
      if (response.status === 200) {
        // Check the status code for success
        props.setUserEdited();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="user-view _add-view">
      <h1>Basic Info</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Full Name:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Username:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Email Address:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email Address"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Phone Number:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Website:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Website"
                value={userInfo.website}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, website: e.target.value })
                }
              />
            </p>
          </div>
        </div>
      </div>

      <h1>User Address</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>City:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name"
                value={userInfo.address.city}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: {
                      ...userInfo.address,
                      city: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Street:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Street Name"
                value={userInfo.address.street}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: {
                      ...userInfo.address,
                      street: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Suite:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Suite Name"
                value={userInfo.address.suite}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: {
                      ...userInfo.address,
                      suite: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>ZIP Code:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ZIP Code"
                value={userInfo.address.zipcode}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: {
                      ...userInfo.address,
                      zipcode: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
        </div>
      </div>

      <h1>User Company</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Company Name:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
                value={userInfo.company.name}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    company: {
                      ...userInfo.company,
                      name: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Catch Phrase:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Catch Phrase"
                value={userInfo.company.catchPhrase}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    company: {
                      ...userInfo.company,
                      catchPhrase: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>BS:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter BS"
                value={userInfo.company.bs}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    company: {
                      ...userInfo.company,
                      bs: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
        </div>
      </div>

      <button className="btn btn-success" onClick={() => editExitUser()}>
        Edit Existing User
      </button>
    </div>
  );
}

export default EditUser;
