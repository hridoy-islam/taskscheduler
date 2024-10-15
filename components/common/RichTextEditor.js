import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ register, setValue, name }) => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = React.useRef(null);

  const handleChange = (value) => {
    setEditorContent(value);
    setValue(name, value); // Set value in the form state
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const urlPattern = new RegExp("https?://[\\w.-]+(:\\d+)?(/[^\\s]*)?");

    const quill = quillRef.current.getEditor();

    if (urlPattern.test(pastedData)) {
      const range = quill.getSelection();
      quill.insertText(range.index, pastedData, { link: pastedData });
      quill.insertText(range.index + pastedData.length, " ");
    } else {
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
