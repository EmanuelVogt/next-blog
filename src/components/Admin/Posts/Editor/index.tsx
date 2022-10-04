/* eslint-disable react/display-name */
import { useMemo, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
  }
);

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

type Props = {
  setValue: any;
};
export function Editor({ setValue }: Props): JSX.Element {

  const editorRef = useRef(null);

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("arquivo", file);
    formData.append("s3Path", `team/apajwd123açsdlkj/avatar`);
    const response = await axios.post("/api/upload", formData);
    insertToEditor(response.data.url);
  };

  const imageHandler = (e: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files![0];
      if (/^image\//.test(file.type)) {
        uploadToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  function insertToEditor(url: any) {
    //@ts-ignore
    editorRef.current.getEditor().insertEmbed(null, "image", url);
  }

  const modules = useMemo(
    () => ({
      syntax: true,
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          ["code-block"],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
        clipboard: {
          matchVisual: false,
        },
      },
    }),
    []
  );

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme="snow"
      style={{ height: "400px", marginTop: "20px" }}
      multiline
      onChange={setValue}
      forwardedRef={editorRef}
    />
  );
}
