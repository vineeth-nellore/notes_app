import { useLocation } from "react-router-dom";
import { useNotes } from "../../context/notes-context";
import { findNotesInArchive } from "../../utils/findNotesInArchive";

export const NotesCard = ({ id, title, text, isPinned }) => {
  const { notesDispatch, archive, bin, important } = useNotes();
  const onPinClick = (id) => {
    !isPinned
      ? notesDispatch({
          type: "PIN",
          payload: { id },
        })
      : notesDispatch({
          type: "UNPIN",
          payload: { id },
        });
  };

  const onArchiveClick = (id) => {
    !isNotesInArchive
      ? notesDispatch({
          type: "ADD_TO_ARCHIVE",
          payload: { id },
        })
      : notesDispatch({
          type: "REMOVE_FROM_ARCHIVE",
          payload: { id },
        });
  };

  // const onDeleteClick = (id) => {
  //   notesDispatch({
  //     type: "DELETE",
  //     payload: { id },
  //   });
  // };

  const location = useLocation();
  const isOnBinPage = location.pathname === "/bin";

  const onDeleteClick = () => {
    !isOnBinPage
      ? notesDispatch({
          type: "DELETE",
          payload: { id, title, text, isPinned },
        })
      : notesDispatch({
          type: "DELETE_FROM_BIN",
          payload: { id, title, text, isPinned },
        });
  };

  const onImportantClick = ()=>{
    !isNotesInImportant
      ? notesDispatch({
          type: "ADD_TO_IMPORTANT",
          payload: { id, title, text, isPinned },
        })
      : notesDispatch({
          type: "REMOVE_FROM_IMPORTANT",
          payload: { id, title, text, isPinned },
        });
  }

  const findNotesInImportant = (important, id) => {
    return important.some(note => note.id === id)
  } 

  const isNotesInArchive = findNotesInArchive(archive, id);
  const isNotesInImportant = findNotesInImportant(important, id);

  return (
    <div className="border border-neutral-800 p-4 rounded-md w-[300px] min-h-[200px] flex flex-col">
      {/* Title + Pin */}
      <div className="flex justify-between items-start mb-2 pb-2 border-b border-neutral-300">
        <p className="font-semibold">{title}</p>
        {!isNotesInImportant && !isNotesInArchive && (
          <button onClick={() => onPinClick(id)}>
            <span
              className={
                isPinned ? "material-icons" : "material-icons-outlined"
              }
            >
              push_pin
            </span>
          </button>
        )}
      </div>

      {/* Note Text */}
      <div className="flex-1">
        <p>{text}</p>
      </div>

      {/* Bottom Icons */}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-neutral-300">
        {/* Important */}
        {location.pathname !== "/archive" && (
          <button onClick={() => onImportantClick(id)}>
            <span className="material-icons"> {!isNotesInImportant?"label_important_outline":"label_important"}</span>
          </button>
        )}

        {/* Archive & Delete */}
        <div className="flex gap-2">
          {!isNotesInImportant && (<button onClick={() => onArchiveClick(id)}>
            <span
              className={
                isNotesInArchive ? "material-icons" : "material-icons-outlined"
              }
            >
              archive
            </span>
          </button>)}
          <button onClick={onDeleteClick}>
            <span className="material-icons-outlined"> delete </span>
          </button>
        </div>
      </div>
    </div>
  );
};
