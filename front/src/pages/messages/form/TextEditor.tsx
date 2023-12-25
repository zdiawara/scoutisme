import classNames from "classnames";
import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

type TextEditorProps = {
  name: string;
  label?: string;
};

export const TextEditor = ({ name, label }: TextEditorProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = useMemo(() => {
    return errors[name];
  }, [errors, name]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Form.Group className="position-relative">
              {label && (
                <Form.Label>
                  {label}
                  <strong className="text-danger">&nbsp;*</strong>
                </Form.Label>
              )}
              <ReactQuill
                onChange={(text) => {
                  setValue(name, text);
                }}
                value={field.value}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                bounds=".app"
                placeholder="Contenu du message ..."
                className={classNames("text-dark fs-4", {
                  "is-invalid": !!error,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {error?.message?.toString()}
              </Form.Control.Feedback>
            </Form.Group>
          </>
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
