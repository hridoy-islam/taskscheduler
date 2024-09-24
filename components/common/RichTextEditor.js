import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = React.useRef(null); // Create a ref for the Quill editor

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedData = e.clipboardData.getData("text/plain");
    const urlPattern = new RegExp("https?://[\\w.-]+(:\\d+)?(/[^\\s]*)?");

    const quill = quillRef.current.getEditor(); // Access the Quill editor instance

    if (urlPattern.test(pastedData)) {
      const range = quill.getSelection(); // Get the current selection
      quill.insertText(range.index, pastedData, { link: pastedData }); // Insert link
      quill.insertText(range.index + pastedData.length, " "); // Add a space after the link
    } else {
      // If it's not a valid URL, insert the text as is
      quill.insertText(quill.getSelection().index, pastedData);
    }
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={handleChange}
        onPaste={handlePaste}
      />
    </div>
  );
};

export default RichTextEditor;
