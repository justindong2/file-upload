import React, { useEffect, useState } from 'react';
import getFiles from './fetchFiles';

// const url = 'http://localhost:5000';
const url = '/api';

const FileList = () => {
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const fetchFiles = async () => {
      if (files === null) {
        const fileList = await getFiles();
        setFiles(fileList.data);
        console.log(fileList.data);
      }
    };
    fetchFiles();
  }, [files]);

  return (
    <div>
      <p>Files</p>
      <div>
        {files && files.map((file) => {
          return (
            <div>
              <a href={`${url}/file/${file.filename}`} key={file._id}>{file.filename}</a>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FileList;
