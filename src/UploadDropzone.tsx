import React, { useState } from 'react';

interface FormComponentProps {
  onSubmit: (data: { [key: string]: any }) => void;
}

const UploadDropzone: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="example" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadDropzone;
