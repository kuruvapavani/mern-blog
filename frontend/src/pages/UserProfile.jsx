import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "./context/userContext"
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleExclamation,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultAvatar from "./default.jpg"


const UserProfile = () => {
  const [avatar, setAvatar] = useState(DefaultAvatar); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id;
  const token = currentUser?.token;
  const navigate = useNavigate();
  const [avatarTouch,setAvatarTouch]=useState(false);
  async function uploadAvatarToDrive(avatar) {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data.avatar; // Assuming the response contains the new avatar URL
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw new Error('Failed to upload avatar');
    }
  }
  const handleAvatarChange = async (e) => {
    setAvatarTouch(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setAvatar(response.data.avatar);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
        const {username,email,avatar}=response.data;
        setUsername(username);
        setEmail(email);
        setAvatar(avatar);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(<><FontAwesomeIcon icon={faCircleExclamation} /> {err.response.data.message}</>);
        } else {
          setError(<><FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.</>);
        }
      }
    };

    if (!userId) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.set('username', username);
    userData.set('email', email);
    userData.set('currentPassword', currentPassword);
    userData.set('newPassword', newPassword);
    userData.set('newconfirmPassword', confirmNewPassword);    
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        return navigate('/logout');
      }
    } catch (err) {
      console.error("Error:", err);
      if(err){
        setError(<><FontAwesomeIcon icon={faCircleExclamation} /> {err.response.data.error}</>);
      } else {
        setError(<><FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.</>);
      }
    }
  }

  return (
    <div className='my-profile'>
      <form className='profile-form' onSubmit={handleSubmit}>
        <div className='profile-edit'>
        <div className="profile-pic-container">
        <form>
        <img src={avatar ? `https://drive.google.com/thumbnail?id=${avatar}&sz=w1000` : DefaultAvatar} alt='profilepic' className='profile-pic' />
          <label htmlFor='avatar' className="edit-icon" onClick={() => setAvatarTouch(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </label>
          <input type='file' id='avatar' onChange={(e) => setAvatar(e.target.files[0])} accept='image/png, image/jpeg, image/jpg' style={{ display: 'none' }} />
        </form>
        {avatarTouch && <button onClick={handleAvatarChange} className='edit-icon'><FontAwesomeIcon icon={faCircleCheck} /></button>}
      </div>


          
          <h3>{username}</h3>
          <h6 className='error'>{error}</h6>
          <Link to={`/dashboard`}><button className='btn'>My Posts</button></Link>
          <Input label="Username" placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Old Password" type="password" placeholder="" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} />
          <Input label="New Password" type="password" placeholder="" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
          <Input label="Confirm New Password" type="password" placeholder="" onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} />
          <div className='submit'><button className='btn' type='submit'>Reset Changes</button></div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
