import React, { useEffect, useState } from 'react'

const DocList = (props) => {
    const [fileList, setFileList] = useState([]);
    const { accessToken, refresh } = props;


    const getAllFilesFromDrive = async () => {
        const response = await fetch(import.meta.env.VITE_BASE_URL + "/files?accessToken=" + accessToken);
        const data = await response.json();
        setFileList(data.files);

    }

    useEffect(() => {
        getAllFilesFromDrive();
    }, [refresh])



  return (
    <div style={{ textAlign: "center" }}>
  <h1>Uploaded File List</h1>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid black",
    }}
  >
    <thead>
      <tr style={{ backgroundColor: "#f2f2f2" }}>
        <th style={{ border: "1px solid black", padding: "10px" }}>File Name</th>
      </tr>
    </thead>
    <tbody>
      {fileList.length > 0 ? (
        fileList.map((file) => (
          <tr key={file.id}>
            <td onClick={() => window.open(file.viewLink)} style={{ border: "1px solid black", padding: "10px", cursor: "pointer" }}>
              {file.name}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="1"
            style={{
              border: "1px solid black",
              padding: "10px",
              fontStyle: "italic",
              color: "gray",
            }}
          >
            No files uploaded
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  )
}

export default DocList