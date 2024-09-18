import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

export const UploadDropzone = ({
  onFilesSelected,
  onChange,
  width,
  height,
  disabled = false,
}: {
  onFilesSelected: React.Dispatch<React.SetStateAction<File[]>>;
  onChange?: (files: File[]) => void;
  width: string;
  height: string;
  disabled?: boolean;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section style={{ width: width, height: height }}>
      <div
        className={clsx(
          'border-gray80',
          'rounded-md',
          'border-2',
          'flex',
          'flex-col',
          'items-center',
          'w-full',
          'text-center',
          'p-10',
          {
            'border-yellow': files.length
          }
        )}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <section>
          <div
            className={clsx(
              'flex',
              'flex-col',
              'items-center',
              'w-full',
              'text-center'
            )}
          >
            <p className={clsx('text-gray80')}>Drag and drop your files here</p>
            <p className={clsx('text-gray80')}>
              Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT,
              .XLSX
            </p>
          </div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".pdf,.docx,.pptx,.txt,.xlsx"
            multiple
          />
          <label htmlFor="browse" className={clsx('text-gray80')}>
            Browse files
          </label>
        </section>

        {files.length > 0 && (
          <div className={clsx('flex', 'flex-col', 'w-full')}>
            {files.map((file, index) => (
              <div
                className={clsx('flex', 'w-full', 'justify-between')}
                key={index}
              >
                <div className={clsx('flex', 'flex-col', 'items-start')}>
                  <p className={clsx('text-gray80')}>File name: {file.name}</p>
                  <p className={clsx('text-gray80')}>File type: {file.type}</p>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className={clsx('text-gray80')}
                >
                  Remove file
                </button>
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <p className={clsx('text-gray80')}>{files.length} file(s) selected</p>
        )}
      </div>
    </section>
  );
};
