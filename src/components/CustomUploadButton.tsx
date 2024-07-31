
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";

const CustomUploadButton = ({ setSelectedFile, setLocalAvatarUrl }: { setSelectedFile: any, setLocalAvatarUrl: any }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const localUrl = URL.createObjectURL(file);
      setLocalAvatarUrl(localUrl);
      setSelectedFile(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button onClick={handleButtonClick}>Upload</Button>
    </>
  );
};

export default CustomUploadButton;
