import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultAvatar from "../assets/default.jpg";
import LoadingAnimation from "../components/Loader";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(DefaultAvatar);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [avatarTouch, setAvatarTouch] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const userId = currentUser?.id;

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) navigate("/login");

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
        const { username, email, avatar } = response.data;
        setUsername(username);
        setEmail(email);
        setAvatar(avatar || DefaultAvatar);
      } catch (err) {
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  if (loading || submitLoading || avatarLoading) return <LoadingAnimation />;

  const onAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewAvatar(URL.createObjectURL(file));
    setAvatar(file);
    setAvatarTouch(true);
  };

  const handleAvatarChange = async () => {
    if (!avatar) return;
    setAvatarLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        {
          avatar: cloudinaryRes.data.secure_url,
          avatarPublicId: cloudinaryRes.data.public_id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAvatar(response.data.avatar);
      setPreviewAvatar(null);
      setAvatarTouch(false);
    } catch (err) {
      console.error(err);
      setError("Failed to upload avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("username", username);
      formData.set("email", email);
      formData.set("currentPassword", currentPassword);
      formData.set("newPassword", newPassword);
      formData.set("newconfirmPassword", confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) navigate("/logout");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="my-profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-edit">
          <div className="profile-pic-container">
            <img src={previewAvatar || avatar || DefaultAvatar} alt="profilepic" className="profile-pic" />
            <label htmlFor="avatar" className="edit-icon">
              <FontAwesomeIcon icon={faPenToSquare} />
            </label>
            <input type="file" id="avatar" onChange={onAvatarSelect} accept="image/*" style={{ display: "none" }} />
            {avatarTouch && (
              <button type="button" onClick={handleAvatarChange} className="edit-icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>
            )}
          </div>

          <h3>{username}</h3>
          <h6 className="error">{error}</h6>
          <Link to={`/dashboard`}><button className="btn">My Posts</button></Link>

          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Old Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input label="Confirm New Password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

          <div className="submit">
            <button className="btn" type="submit">Reset Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
