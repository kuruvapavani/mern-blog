import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultAvatar from "../assets/default.jpg";
import LoadingAnimation from "../components/Loader";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(DefaultAvatar);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id;
  const token = currentUser?.token;

  const [avatarTouch, setAvatarTouch] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`
        );
        const { username, email, avatar } = response.data;
        setUsername(username);
        setEmail(email);
        setAvatar(avatar || DefaultAvatar);
      } catch (err) {
        if (err.response?.data?.message) {
          setError(
            <>
              <FontAwesomeIcon icon={faCircleExclamation} />{" "}
              {err.response.data.message}
            </>
          );
        } else {
          setError(
            <>
              <FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.
            </>
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  if (loading || submitLoading || avatarLoading) {
    return <LoadingAnimation />;
  }

  const onAvatarSelect = (e) => {
    const file = e.target.files[0];
    setPreviewAvatar(URL.createObjectURL(file));
    setAvatar(file);
    setAvatarTouch(true);
  };

  const handleAvatarChange = async () => {
    setAvatarTouch(false);
    setAvatarLoading(true);

    try {
      const postData = new FormData();
      postData.append("avatar", avatar);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAvatar(response.data.avatar);
      setPreviewAvatar(null);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const userData = new FormData();
    userData.set("username", username);
    userData.set("email", email);
    userData.set("currentPassword", currentPassword);
    userData.set("newPassword", newPassword);
    userData.set("newconfirmPassword", confirmNewPassword);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return navigate("/logout");
      }
    } catch (err) {
      setError(
        <>
          <FontAwesomeIcon icon={faCircleExclamation} />{" "}
          {err.response?.data?.error || "An error occurred"}
        </>
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="my-profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-edit">
          <div className="profile-pic-container">
            <img
              src={previewAvatar || avatar || DefaultAvatar}
              alt="profilepic"
              className="profile-pic"
            />

            <label htmlFor="avatar" className="edit-icon">
              <FontAwesomeIcon icon={faPenToSquare} />
            </label>

            <input
              type="file"
              id="avatar"
              onChange={onAvatarSelect}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
            />

            {avatarTouch && (
              <button
                type="button"
                onClick={handleAvatarChange}
                className="edit-icon"
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>
            )}
          </div>

          <h3>{username}</h3>
          <h6 className="error">{error}</h6>

          <Link to={`/dashboard`}>
            <button className="btn">My Posts</button>
          </Link>

          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Old Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <div className="submit">
            <button className="btn" type="submit">
              Reset Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
