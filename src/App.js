import React, { useState, useRef } from "react";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './App.css';

const modules = {
  toolbar: [
    [{header: [1,2,3,4,5,6, false]}],
    [ {font: [] }],
    [{size: [] }],
    [{color: []}],
    [{background: []}],
    [{undo: true, redo: true}]
  ],
}

const formats = [
  'header',
  'font',
  'size',
  'color',
  'background',
  'undo',
  'redo',
];


const App = () =>  {
  const [textValue, setTextValue] = useState("");
  const [showValue, setShowValue] = useState("");
  const quillRef = useRef();

  const onUpdateValue = () => {
    setShowValue(prevShowValue => `${prevShowValue}\n${textValue}`);
  }

  const handleUndo = () => {
    const quill = quillRef.current.getEditor();
    quill.history.undo();
  };

  const handleRedo = () => {
    const quill = quillRef.current.getEditor();
    quill.history.redo();
  };


  return (
    <div>
      <h1 className="main-heading">Editor</h1>
      <div className="container">
        <div className="editor">
          <div>
          <ReactQuill theme="snow" onChange={setTextValue} ref={quillRef} formats={formats} modules={modules} value={textValue} className="react-quill" />
          </div>
          <button type="button" className="btn" onClick={onUpdateValue}>Add Text</button>
          <button type="button" className="btn" onClick={handleUndo}>
            Undo
          </button>
          <button type="button" className="btn" onClick={handleRedo}>
            Redo
          </button>
        </div>
        <div className="preview" dangerouslySetInnerHTML={{ __html: showValue }} />
      </div>
      
    </div>
  );
}

export default App;
