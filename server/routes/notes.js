import express from "express";

import Note from "../models/Note.js";

import auth from "../middleware/auth.js";

import upload from "../middleware/upload.js";

import cloudinary from "../config/cloudinary.js";

const router = express.Router();


/* =========================
   GET NOTES
========================= */

router.get("/", auth, async (req, res) => {

  try {

    const notes = await Note.find({

      userId: req.userId,

      $or: [
        { archived: false },
        { archived: { $exists: false } }
      ]
    });

    res.json(notes);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error fetching notes"
    });
  }
});


/* =========================
   IMAGE UPLOAD
========================= */

router.post(

  "/upload",

  auth,

  upload.single("image"),

  async (req, res) => {

    try {

      const b64 =
        Buffer.from(req.file.buffer)
        .toString("base64");

      const dataURI =
        "data:" +
        req.file.mimetype +
        ";base64," +
        b64;

      const result =
        await cloudinary.uploader.upload(
          dataURI,
          {
            folder: "notes_app"
          }
        );

      res.json({
        imageUrl: result.secure_url
      });

    } catch (err) {

      console.log(
        "UPLOAD ERROR:"
      );

      console.log(err);

      res.status(500).json({
        message: "Upload failed"
      });
    }
  }
);


/* =========================
   ADD NOTE
========================= */

router.post("/", auth, async (req, res) => {

  try {

    const {
      title,
      content,
      category,
      image
    } = req.body;

    const newNote = new Note({

      title,
      content,
      category,
      image,

      userId: req.userId
    });

    await newNote.save();

    res.json(newNote);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error adding note"
    });
  }
});


/* =========================
   DELETE NOTE
========================= */

router.delete("/:id", auth, async (req, res) => {

  try {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Note deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error deleting note"
    });
  }
});


/* =========================
   UPDATE NOTE
========================= */

router.put("/:id", auth, async (req, res) => {

  try {

    const {
      title,
      content
    } = req.body;

    await Note.findByIdAndUpdate(

      req.params.id,

      {
        title,
        content
      }
    );

    res.json({
      message: "Note updated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error updating note"
    });
  }
});


/* =========================
   PIN NOTE
========================= */

router.put("/pin/:id", auth, async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    );

    note.pinned = !note.pinned;

    await note.save();

    res.json(note);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error pinning note"
    });
  }
});


/* =========================
   ARCHIVE NOTE
========================= */

router.put("/archive/:id", auth, async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    );

    note.archived = !note.archived;

    await note.save();

    res.json(note);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Archive failed"
    });
  }
});


export default router;