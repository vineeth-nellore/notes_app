import { Fragment, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { SideBar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";

export const Bin = () => {
  const { bin, notesDispatch } = useNotes();

  useEffect(() => {
    const now = new Date().getTime();

    bin.forEach((note) => {
      const deletedAt = new Date(note.deletedAt).getTime();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      if (now - deletedAt > sevenDaysInMs) {
        notesDispatch({ type: "DELETE_FROM_BIN", payload: { id: note.id } });
      }
    });
  }, [bin, notesDispatch]);

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <SideBar />
        <div>
          <div className="flex flex-wrap gap-6 w-screen mt-7">
            {bin?.length > 0 &&
              bin.map(({ id, title, text, isPinned }) => (
                <NotesCard
                  key={id}
                  title={title}
                  text={text}
                  id={id}
                  isPinned={isPinned}
                />
              ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
