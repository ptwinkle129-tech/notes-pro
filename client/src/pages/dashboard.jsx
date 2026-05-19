import React, { useEffect, useState } from "react";

import axios from "axios";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import { toast } from "react-toastify";

import NoteCard from "../components/NoteCard";

import Sidebar from "../components/Sidebar";


export default function Dashboard() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] =
    useState("General");

  const [search, setSearch] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  // FETCH NOTES

  const fetchNotes = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/notes",

        {
          headers: {

            Authorization:
              localStorage.getItem("token")
          }
        }
      );

      const sortedNotes =
        res.data.sort(
          (a, b) => b.pinned - a.pinned
        );

      setNotes(sortedNotes);

    } catch (err) {

      console.log(err);
    }
  };


  // IMAGE SELECT

  const uploadImage = (file) => {

    const reader = new FileReader();

    reader.onloadend = () => {

      setImage(reader.result);

      toast.success("Image selected");
    };

    if (file) {

      reader.readAsDataURL(file);
    }
  };


  // ADD NOTE

  const addNote = async () => {

    const cleanContent = content
      .replace(/<(.|\n)*?>/g, "")
      .trim();

    if (!title || !cleanContent) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      await axios.post(

        "http://localhost:5000/api/notes",

        {
          title,
          content,
          category,
          image
        },

        {
          headers: {

            Authorization:
              localStorage.getItem("token")
          }
        }
      );

      setTitle("");

      setContent("");

      setImage("");

      setCategory("General");

      fetchNotes();

      toast.success("Note added");

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to add note"
      );
    }
  };


  // LOAD NOTES

  useEffect(() => {

    fetchNotes();

  }, []);


  return (

    <div
      style={{
        display: "flex"
      }}
    >

      {/* SIDEBAR */}

      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={
          setSidebarOpen
        }
      />


      {/* MAIN */}

      <div
        style={{

          flex: 1,

          minHeight: "100vh",

          background: darkMode
            ? "#0f172a"
            : "#f1f5f9",

          padding: "20px",

          color: darkMode
            ? "white"
            : "black",

          transition: "0.3s"
        }}
      >

        {/* TOP BAR */}

        <div
          style={{

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "20px"
          }}
        >

          {/* DARK MODE */}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }

            style={{

              padding: "10px 20px",

              background: darkMode
                ? "#facc15"
                : "#1e293b",

              color: darkMode
                ? "black"
                : "white",

              border: "none",

              borderRadius: "10px",

              cursor: "pointer"
            }}
          >

            {darkMode
              ? "☀ Light Mode"
              : "🌙 Dark Mode"}

          </button>


          {/* LOGOUT */}

          <button

            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              window.location =
                "/login";
            }}

            style={{

              padding: "10px 20px",

              background: "#ef4444",

              color: "white",

              border: "none",

              borderRadius: "10px",

              cursor: "pointer"
            }}
          >

            Logout

          </button>

        </div>


        {/* TITLE */}

        <h1
          style={{

            fontSize: "50px",

            marginBottom: "30px"
          }}
        >

          Notes Dashboard

        </h1>


        {/* ADD NOTE BOX */}

        <div
          style={{

            background: darkMode
              ? "#1e293b"
              : "white",

            padding: "20px",

            borderRadius: "20px",

            marginBottom: "30px"
          }}
        >

          {/* TITLE */}

          <input

            type="text"

            placeholder="Title"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            style={{

              width: "100%",

              padding: "12px",

              marginBottom: "15px",

              borderRadius: "10px",

              border: "none"
            }}
          />


          {/* CATEGORY */}

          <select

            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }

            style={{

              width: "100%",

              padding: "12px",

              marginBottom: "15px",

              borderRadius: "10px",

              border: "none"
            }}
          >

            <option>
              General
            </option>

            <option>
              Study
            </option>

            <option>
              Work
            </option>

            <option>
              Ideas
            </option>

            <option>
              Important
            </option>

          </select>


          {/* IMAGE INPUT */}

          <input

            type="file"

            onChange={(e) =>
              uploadImage(
                e.target.files[0]
              )
            }

            style={{

              marginBottom: "15px",

              color: "white"
            }}
          />


          {/* IMAGE PREVIEW */}

          {image && (

            <img

              src={image}

              alt="preview"

              style={{

                width: "200px",

                marginBottom: "15px",

                borderRadius: "15px",

                display: "block"
              }}
            />
          )}


          {/* EDITOR */}

          <div
            className={
              darkMode
                ? "dark-editor"
                : ""
            }
          >

            <ReactQuill

              theme="snow"

              value={content}

              onChange={setContent}

              placeholder="Write your note..."
            />

          </div>


          {/* BUTTON */}

          <button

            onClick={addNote}

            style={{

              marginTop: "15px",

              padding: "12px 25px",

              background: "#6366f1",

              border: "none",

              color: "white",

              borderRadius: "10px",

              cursor: "pointer",

              fontSize: "16px"
            }}
          >

            Add Note

          </button>

        </div>


        {/* SEARCH */}

        <input

          placeholder="Search notes..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "20px",

            borderRadius: "10px",

            border: "none",

            fontSize: "16px"
          }}
        />


        {/* NOTES */}

        <div
          style={{

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill,minmax(300px,1fr))",

            gap: "20px"
          }}
        >

          {notes

            .filter((note) =>

              note.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )

              ||

              note.content
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )

            .map((note) => (

              <NoteCard

                key={note._id}

                note={note}

                fetchNotes={fetchNotes}
              />

            ))}

        </div>

      </div>

    </div>
  );
}