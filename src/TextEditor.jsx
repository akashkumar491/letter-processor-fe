import React, { useRef, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";

const TextEditor = (props) => {
  const { accessToken, setRefresh, refresh } = props;
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const contentRef = useRef(null);

  const increaseFontSize = () => setFontSize((prev) => prev + 2);
  const decreaseFontSize = () => setFontSize((prev) => Math.max(10, prev - 2));

  const generateDocFile = async () => {
    if (!contentRef.current) return;

    const textContent = contentRef.current.innerText; // Extract text from editor

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textContent,
                  font: fontFamily,
                  size: fontSize * 2, // docx size is in half-points
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Generate the DOCX file
    const blob = await Packer.toBlob(doc);

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
    const uniqueFilename = `document_${timestamp}.docx`;

    const file = new File([blob], uniqueFilename, {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    return file;
  };

  // Function to upload the generated DOCX file
  const uploadDocument = async () => {
    const file = await generateDocFile();
    if (!file) return alert("Error generating file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("accessToken", accessToken); // Replace with actual token

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("File uploaded successfully!");
        setRefresh(!refresh);
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div style={{ width: "50%", margin: "20px auto", textAlign: "center" }}>
      {/* Toolbar */}
      <div style={{ marginBottom: "10px" }}>
        <h1>Text Editor</h1>
        <button onClick={decreaseFontSize}>A-</button>
        <button onClick={increaseFontSize} style={{ marginLeft: "10px" }}>
          A+
        </button>
        <select
          style={{ marginLeft: "10px", padding: "5px" }}
          onChange={(e) => setFontFamily(e.target.value)}
          value={fontFamily}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Editable Text Box */}
      <div
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        style={{
          border: "1px solid black",
          minHeight: "150px",
          padding: "10px",
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
        }}
      >
        Start typing here...
      </div>
      <button
        onClick={uploadDocument}
        style={{
          margin: "10px",
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "16px",
          border: "none",
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default TextEditor;
