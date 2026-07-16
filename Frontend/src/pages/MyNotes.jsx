import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import api from '../services/api'
import formatDate from '../utils/formatExpiryTime'
import timerUntilExpiry from '../utils/timerUntilExpiry'
import NoteCard from '../components/NoteCard'

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await api.get("/notes/my-notes");
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);

  const handleRevoke = async (noteId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to revoke this note? This action cannot be undone.");
      if (!confirmed) return;

      await api.patch(`/notes/revoke/${noteId}`);

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId
            ? { ...note, isRevoked: true }
            : note
        )
      );
    } catch (error) {
      console.error("Error revoking note:", error);
    }
  };


  return (
    <>
      <NavBar />
      <div className='p-4'>
        <h1 className='text-4xl font-bold my-10'>{ notes.length>0? "My Notes" : "No Notes Found" }</h1>
        <div className='grid gap-8 grid-cols-5'>
          {
            notes.map((note) => (
              <NoteCard
                key={note._id}
                noteId={note._id}
                accessType={note.accessType}
                title={note.title}
                content={note.content}
                createdAt={formatDate(note.createdAt)}
                viewCount={note.viewCount}
                expiryDate={timerUntilExpiry(note.expiryDate)}
                isRevoked={note.isRevoked}
                onRevoke={handleRevoke}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}


export default MyNotes;
