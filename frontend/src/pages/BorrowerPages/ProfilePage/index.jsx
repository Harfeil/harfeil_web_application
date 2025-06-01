// resources/js/components/ProfilePage.js
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { BorrowerSidebarTabs } from '../../../components/Sidebar/SideBarItems';
import { createData, getData } from '../../../services/ApiServices';
import { sanctumInstance } from '../../../axios/AxiosInstance';

const BASE_IMAGE_URL = 'http://localhost:8000/storage';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingCsrf, setLoadingCsrf] = useState(true);
  const [userId, setUserId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        await sanctumInstance.get('/sanctum/csrf-cookie');
      } catch (error) {
        console.error('Failed to fetch CSRF cookie:', error);
      } finally {
        setLoadingCsrf(false);
      }
    };
    fetchCsrf();
  }, []);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.id) {
        setUserId(storedUser.id);
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
    }
  }, []);

  useEffect(() => {
    if (!userId || loadingCsrf) return;

    const fetchUser = async () => {
      try {
        const data = await getData('users', userId);
        setUser(data);

        const profilePicUrl = data.profile_picture
          ? `${BASE_IMAGE_URL}/${data.profile_picture}`
          : null;

        setImagePreview(profilePicUrl);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, [userId, loadingCsrf]);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    setImageFile(file);
    setImageName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert('Please select an image first.');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('profile_picture', imageFile, imageFile.name);

      const updatedUser = await createData(`users/${userId}/`, formData);
      setUser(updatedUser);

      const profilePicUrl = updatedUser.profile_picture
        ? `${BASE_IMAGE_URL}/${updatedUser.profile_picture}`
        : null;

      setImagePreview(profilePicUrl);
      setImageName(updatedUser.profile_picture?.split('/').pop() || '');
      fileInputRef.current.value = '';
      setImageFile(null);

      alert('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      const message =
        error.response?.data?.errors?.profile_picture?.join(', ') ||
        error.response?.data?.message ||
        'Upload failed. Please try again.';
      alert(message);
    } finally {
      setUploading(false);
    }
  };

  if (!user || loadingCsrf) return <p>Loading profile...</p>;

  return (
    <div className="dashboard-container pr-[70px]">
      <Sidebar action="borrowerProfile" tabs={BorrowerSidebarTabs} />
      <div className="pl-20 pt-5 w-full">
        <h1 className="text-4xl font-bold mb-4">Profile Page</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={handleDivClick}
            className="bg-amber-950 h-[200px] w-[200px] rounded-full flex items-center justify-center text-white font-bold cursor-pointer overflow-hidden mx-auto mb-2"
            title="Click to select image"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="object-cover h-full w-full"
                onError={() => setImagePreview(null)}
              />
            ) : (
              <span>Picture</span>
            )}
          </div>

          <div className="text-center mb-4">
            <button
              onClick={handleUpload}
              disabled={uploading || loadingCsrf}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Picture'}
            </button>
          </div>

          <p className="text-gray-700 mb-2">
            <strong>Name:</strong>{' '}
            {user.name || `${user.first_name || ''} ${user.last_name || ''}`}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {user.email_address || user.email || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
