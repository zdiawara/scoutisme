import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

/*
 * Simple TextEditor component that takes placeholder text as a prop
 */
export const TextEditor = () => {
  const { control, setValue } = useFormContext();

  return (
    <div>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <ReactQuill
            onChange={(text) => {
              console.log(text);
              setValue("content", text);
            }}
            value={field.value}
            modules={TextEditor.modules}
            formats={TextEditor.formats}
            bounds={".app"}
            placeholder="contenu"
            className="text-dark fs-4"
            name="content"
          />
        )}
      />
    </div>
  );
};

/*
 * Quill modules to attach to TextEditor
 * See https://quilljs.com/docs/modules/ for complete options
 */
TextEditor.modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill TextEditor formats
 * See https://quilljs.com/docs/formats/
 */
TextEditor.formats = [
  //"header",
  //"font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
