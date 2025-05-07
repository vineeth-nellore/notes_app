import { v4 as uuid } from "uuid";
export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "TITLE":
      return {
        ...state,
        title: payload,
      };
    case "TEXT":
      return {
        ...state,
        text: payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          { text: state.text, title: state.title, id: uuid(), isPinned: false },
        ],
      };
    case "CLEAR_INPUT":
      return {
        ...state,
        title: "",
        text: "",
      };
    case "PIN":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === payload.id) {
            return { ...note, isPinned: !note.isPinned };
          }
          return note;
        }),
      };
    case "UNPIN":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === payload.id) {
            return { ...note, isPinned: !note.isPinned };
          }
          return note;
        }),
      };
    case "ADD_TO_ARCHIVE":
      return {
        ...state,
        archive: [
          ...state.archive,
          state.notes.find(({ id }) => id === payload.id),
        ],
        notes: state.notes.filter(({ id }) => id !== payload.id),
      };
    case "REMOVE_FROM_ARCHIVE":
      return {
        ...state,
        notes: [
          ...state.notes,
          state.archive.find(({ id }) => id === payload.id),
        ],
        archive: state.archive.filter(({ id }) => id !== payload.id),
      };
    case "DELETE":
      const noteToDelete =
        state.notes.find((n) => n.id === payload.id) ||
        state.archive.find((n) => n.id === payload.id)||
        state.important.find((n) => n.id === payload.id);
      return {
        ...state,
        bin: [
          ...state.bin,
          { ...noteToDelete, deletedAt: new Date().toISOString() },
        ],
        notes: state.notes.filter((n) => n.id !== payload.id),
        archive: state.archive.filter((n) => n.id !== payload.id),
        important: state.important.filter((n) => n.id !== payload.id),
      };
    case "DELETE_FROM_BIN":
      return {
        ...state,
        bin: state.bin.filter(({ id }) => id !== payload.id),
      };
    case "ADD_TO_IMPORTANT":
      return {
        ...state,
        important: [
          ...state.important,
          state.notes.find(({ id }) => id === payload.id),
        ],
        notes: state.notes.filter(({ id }) => id !== payload.id),
      };  
    case "REMOVE_FROM_IMPORTANT":
      return {
        ...state,
        notes: [
          ...state.notes,
          state.important.find(({ id }) => id === payload.id),
        ],
        important: state.important.filter(({ id }) => id !== payload.id),
      };  
    default:
      return state;
  }
};
