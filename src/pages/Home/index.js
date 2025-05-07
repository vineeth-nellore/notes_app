import { Navbar } from "../../components/Navbar";
import { Fragment, useReducer, useState } from "react";
import { SideBar } from "../../components/Sidebar";
import { notesReducer } from "../../reducers/notesReducer";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";
export const Home = () => {
  const { title, text, notes,archive, bin,important, notesDispatch } = useNotes();

  const onTitleChange = (e) => {
    notesDispatch({
      type: "TITLE",
      payload: e.target.value,
    });
  };
  const onTextChange = (e) => {
    notesDispatch({
      type: "TEXT",
      payload: e.target.value,
    });
  };
  const onAddClick = () => {
    notesDispatch({
      type: "ADD_NOTE",
    });
    notesDispatch({
      type: "CLEAR_INPUT",
    });
  };

  const pinnedNotes =
    notes?.length > 0 && notes.filter(({ isPinned }) => isPinned);
  const otherNotes =
    notes?.length > 0 && notes.filter(({ isPinned }) => !isPinned);

  console.log(bin);  

  return (
    <Fragment>
      <Navbar></Navbar>
      <main className="flex gap-3">
        <SideBar></SideBar>
        <div className="flex flex-col w-screen mt-7">
          {/* <div className="flex flex-col w-[300px] relative">
                        <input value={title} onChange={(e)=>onTitleChange(e)} className="border border-b-0 border-neutral-800 rounded-t-md p-2" placeholder="Enter title" />
                        <textarea value={text} onChange={(e)=>onTextChange(e)} className="border border-neutral-800 rounded-b-md p-2" placeholder = "Enter Text" />
                        < button disabled={title.length === 0 || text.length === 0} onClick={onAddClick} className = "absolute bottom-1 right-1 w-6 h-6 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full border border-indigo-700 shadow transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" > <span class = "material-icons-outlined" > add </span></button >
                    </div> */}
          <div className="flex flex-col w-[450px] p-4 bg-white border border-gray-200 rounded-xl shadow-md relative gap-3 self-center">
            <input
              value={title}
              onChange={onTitleChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              placeholder="Enter title"
            />
            <textarea
              value={text}
              onChange={onTextChange}
              rows={4}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition resize-none"
              placeholder="Enter text"
            />
            <div className="flex justify-end">
              <button
                disabled={title.length === 0 || text.length === 0}
                onClick={onAddClick}
                className="w-10 h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full border border-indigo-700 shadow transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-icons-outlined text-base">add</span>
              </button>
            </div>
          </div>
          <div className="mt-14 ml-10 flex flex-col gap-5">
            {pinnedNotes?.length > 0 && (
              <div>
                <h3>Pinned Notes</h3>
                <div className="flex flex-wrap gap-6">
                  {pinnedNotes?.length > 0 &&
                    pinnedNotes.map(({ id, title, text, isPinned }) => (
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
            )}
            <div>
              {pinnedNotes?.length > 0 && <h3>Other Notes</h3>}
              <div className="flex flex-wrap gap-6">
                {otherNotes?.length > 0 &&
                  otherNotes.map(({ id, title, text, isPinned }) => (
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
          </div>
        </div>
      </main>
    </Fragment>
  );
};
