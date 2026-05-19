import React, { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";


export default function NoteCard({
  note,
  fetchNotes
}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const [editTitle, setEditTitle] =
    useState(note.title);

  const [editContent, setEditContent] =
    useState(note.content);

  const token =
    localStorage.getItem("token");


  // DELETE NOTE

  const deleteNote = async () => {

    try {

      await axios.delete(

        `http://localhost:5000/api/notes/${note._id}`,

        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchNotes();

    } catch (err) {

      console.log(err);
    }
  };


  // UPDATE NOTE

  const updateNote = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/notes/${note._id}`,

        {
          title: editTitle,
          content: editContent
        },

        {
          headers: {
            Authorization: token
          }
        }
      );

      setIsEditing(false);

      fetchNotes();

    } catch (err) {

      console.log(err);
    }
  };


  // PIN NOTE

  const togglePin = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/notes/pin/${note._id}`,

        {},

        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchNotes();

    } catch (err) {

      console.log(err);
    }
  };


  // ARCHIVE NOTE

  const toggleArchive = async () => {

    try {

      await axios.put(

        `https://notes-pro-0tyl.onrender.com${note._id}`,

        {},

        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchNotes();

    } catch (err) {

      console.log(err);
    }
  };


  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      whileHover={{
        scale: 1.03
      }}

      transition={{
        duration: 0.3
      }}

      style={{

        background: note.pinned
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : "linear-gradient(135deg,#6366f1,#4f46e5)",

        padding: "25px",

        borderRadius: "20px",

        color: "white",

        boxShadow:
          "0 10px 25px rgba(0,0,0,0.3)"
      }}
    >

      {/* CATEGORY */}

      <p
        style={{

          background:
            "rgba(255,255,255,0.2)",

          display: "inline-block",

          padding: "5px 10px",

          borderRadius: "20px",

          fontSize: "12px",

          marginBottom: "10px"
        }}
      >

        {note.category}

      </p>


      {isEditing ? (

        <>

          <input

            value={editTitle}

            onChange={(e) =>
              setEditTitle(
                e.target.value
              )
            }

            style={{

              width: "100%",

              padding: "10px",

              marginBottom: "10px",

              borderRadius: "10px",

              border: "none"
            }}
          />

          <textarea

            value={editContent}

            onChange={(e) =>
              setEditContent(
                e.target.value
              )
            }

            style={{

              width: "100%",

              padding: "10px",

              borderRadius: "10px",

              border: "none",

              minHeight: "120px"
            }}
          />

          <button

            onClick={updateNote}

            style={{

              marginTop: "15px",

              background: "#22c55e",

              border: "none",

              padding: "10px 15px",

              borderRadius: "10px",

              color: "white",

              cursor: "pointer",

              marginRight: "10px"
            }}
          >

            💾 Save

          </button>

        </>

      ) : (

        <>

          <h2>
            {note.title}
          </h2>

          <div

            dangerouslySetInnerHTML={{
              __html: note.content
            }}

            style={{
              marginTop: "15px"
            }}
          />


          {/* IMAGE */}

          {note.image && (

            <img

              src={note.image}

              alt="note"

              style={{

                width: "100%",

                marginTop: "15px",

                borderRadius: "15px"
              }}
            />
          )}


          <button

            onClick={() =>
              setIsEditing(true)
            }

            style={{

              marginTop: "15px",

              background: "#f59e0b",

              border: "none",

              padding: "10px 15px",

              borderRadius: "10px",

              color: "white",

              cursor: "pointer",

              marginRight: "10px"
            }}
          >

            ✏ Edit

          </button>

        </>
      )}


      {/* PIN */}

      <button

        onClick={togglePin}

        style={{

          marginTop: "15px",

          background: note.pinned
            ? "#166534"
            : "#64748b",

          border: "none",

          padding: "10px 15px",

          borderRadius: "10px",

          color: "white",

          cursor: "pointer",

          marginRight: "10px"
        }}
      >

        {note.pinned
          ? "📌 Pinned"
          : "📍 Pin"}

      </button>


      {/* ARCHIVE */}

      <button

        onClick={toggleArchive}

        style={{

          marginTop: "15px",

          background: "#0ea5e9",

          border: "none",

          padding: "10px 15px",

          borderRadius: "10px",

          color: "white",

          cursor: "pointer",

          marginRight: "10px"
        }}
      >

        📦 Archive

      </button>


      {/* DELETE */}

      <button

        onClick={deleteNote}

        style={{

          marginTop: "15px",

          background: "#ef4444",

          border: "none",

          padding: "10px 15px",

          borderRadius: "10px",

          color: "white",

          cursor: "pointer"
        }}
      >

        🗑 Delete

      </button>

    </motion.div>
  );
}