import { Fragment, use } from "react";
import { Navbar } from "../../components/Navbar";
import { SideBar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";

export const Important = () => {

  const {important} = useNotes();  
  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <SideBar />
        <div>
          <div className="flex flex-wrap gap-6 w-screen mt-7">
            {important?.length > 0 &&
              important.map(({ id, title, text, isPinned }) => (
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
