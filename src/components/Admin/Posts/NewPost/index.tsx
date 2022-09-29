/* eslint-disable react/display-name */
import { Box } from "@mui/material";
import { FormEvent, useMemo, useRef } from "react";
import axios from 'axios'
import dynamic from "next/dynamic";
import { useState } from "react";
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

export const NewPost = (): JSX.Element => {
  const [value, setValue] = useState("");
  const editorRef = useRef(null);

  const uploadToServer = async (file: any) => {
    const body = new FormData();
    body.append("file", file);
    const response = await axios.post('/api/upload', body)
    insertToEditor(response.data.newPath)
  };

  const imageHandler = (e: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        uploadToServer(file)
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
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "row",
        height: "500px",
        width: "100%",
      }}
    >
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ width: "100%" }}
        onChange={setValue}
        forwardedRef={editorRef}
      />
    </Box>
  );
};
