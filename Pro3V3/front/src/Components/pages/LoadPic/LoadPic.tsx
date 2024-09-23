import { useForm } from 'react-hook-form';
import { store } from '../../../redux/store';
import './LoadPic.css';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function LoadPic(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const location = useLocation();
  const { newVacId } = location.state || {};
  const navigate = useNavigate();

  const token = store.getState().login.jwt;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('imageFile', file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/dashBoard/uploadPicture/${newVacId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`,
          },
        }
      );
      console.log('Upload success:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className='LoadPic'>
      <h3>Load Pic</h3>
      <h4>Upload Picture for Vacation ID: {newVacId}</h4>
      <form>
        <input type='file' name='imageFile' onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
}
