import { useState, useRef } from "react";
import Modal from "react-modal";
import "./App.css";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "680px",
    height: "480px",
    display: "flex",
    flexDirection: "column",
  },
  overlay: {
    background: "hsla(0, 0%, 0%, 0.6)"
  }
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const idRef = useRef(null);

  const addNote = () => {
    if (title.trim()) {      
      const store = {
        id: notes.length,
        title: title,
        content: content,
        tags: tags,
      };
  
      setNotes((prevNotes) => [...prevNotes, store]);
      setTitle("");
      setContent("");
      setTags([]);
      setAddIsOpen(false)
    }
  };

  const addTag = () => {
    if (tag.trim()) {      
      const store = [];
      store.push(tag.toLowerCase());
  
      setTags((prevTags) => [...prevTags, ...store]);
      setTag("");
    }
  };

  const removeTag = (id) => {
    setTags((prevTags) => prevTags.filter((_, i) => id !== i));
  };

  const listAllTag = () => {
    let allTags = [];

    notes.forEach((x) =>
      x.tags.forEach((y) => {
        if (allTags.includes(y)) {
          allTags.splice(allTags.indexOf(y), 1).push(y);
        }
        allTags.push(y);
      })
    );

    return allTags;
  };

  const applyEdit = () => {
    if (title) {      
      const store = {
        id: idRef.current,
        title: title,
        content: content,
        tags: tags,
      };
  
      setNotes((prevNotes) =>
        prevNotes.map((note, id) => {
          if (id === idRef.current) {
            return store;
          }
          return note;
        })
      );
      setEditIsOpen(false)
    }
  };

  // Queries
  function queryNotes(str) {
    if (str.toString()) {
      return notes.filter((note) =>
        note.tags.some((tag) =>
          tag.toLowerCase().includes(str.toString().toLowerCase())
        )
      );
    }
    return notes;
  }

  // Queries

  // Add Modals

  const [addModalIsOpen, setAddIsOpen] = useState(false);

  function openAddModal() {
    setAddIsOpen(true);
  }

  function closeAddModal() {
    setTitle("");
    setContent("");
    setTags([]);
    setAddIsOpen(false);
  }

  // Add Modals
  // Edit Modals
  const [editIsOpen, setEditIsOpen] = useState(false);

  function openEditModal(id) {
    idRef.current = id;
    setTitle(notes[id].title);
    setContent(notes[id].content);
    setTags(notes[id].tags);
    setEditIsOpen(id);
  }

  function closeEditModal(id) {
    setEditIsOpen(!id);
    setTitle("");
    setContent("");
    setTags([]);
  }

  // Edit

  return (
    <div className="App">
      <div className="App_side">
        <div className="App_header">
          <h1 className="App_title">Notetake</h1>
        </div>
        <div className="container">
          <input
            type="text"
            placeholder="Search by tag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="container query_tags">
          {listAllTag()
            .reverse()
            .map((x, i) => (
              <span
                className="tag"
                key={i}
                onClick={(e) => setQuery(e.target.innerText)}
              >
                {x}
              </span>
            ))}
        </div>
      </div>
      <div className="App_main">
        <div className="note_add">
          <button className="btn add_btn" onClick={openAddModal}>New note</button>
          <Modal
            isOpen={addModalIsOpen}
            onRequestClose={closeAddModal}
            style={modalStyles}
            contentLabel="Add Modal"
            ariaHideApp={false}
          >
            <div className="modal_header">
              <h2> New note </h2>
              <p> Add tag first, then submit later if you want add tags in this note </p>
            </div>
            <div className="modal_body">
              <div className="modal_noteform">
                <input
                  className="titleinput"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="modal_textarea"
                  type="text"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="modal_tagform">
                <div className="tagform_input">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                  <button className="btn" onClick={addTag}>Add</button>
                </div>
                <div className="tagform_taglists">
                  <h4 className="taglists_title">Current tags, click to delete a tag</h4>
                  <div className="taglists">
                    {tags.map((tag, i) => (
                      <span className="tag" key={i} onClick={() => removeTag(i)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal_footer">
              <button className="btn" onClick={addNote}>Add Note</button>
            </div>
          </Modal>
        </div>
        <div className="container notes_container">
        {notes.length ? "" : <p className="note_isempty">Start by creating a new note</p>}
        {queryNotes(query).length ? queryNotes(query).map((n) => (
          <div className="note" key={n.id}>
            <div className="note_content">
              <div className="content_text">
                <h2 className="note_title">{n.title}</h2>
                <p>{n.content}</p>
              </div>
              <div className="content_tags">
                {n.tags.map( (tag,i) => <span className="tag" key={i}>{tag}</span> )}
              </div>
            </div>
            <div className="note_options">
            <div className="note_add">
              <button className="btn add_btn" onClick={() => openEditModal(n.id)}>Edit</button>
              <Modal
                isOpen={editIsOpen === n.id}
                onRequestClose={closeEditModal}
                style={modalStyles}
                contentLabel="Edit Modal"
                ariaHideApp={false}
              >
                <div className="modal_header">
                  <h2> Edit note </h2>
                  <p> Add tag first, then submit later if you want add tags in this note </p>
                </div>
                <div className="modal_body">
                  <div className="modal_noteform">
                    <input
                      className="titleinput"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="modal_textarea"
                      type="text"
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="modal_tagform">
                    <div className="tagform_input">
                      <input
                        type="text"
                        placeholder="Add a tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                      />
                      <button className="btn" onClick={addTag}>Add</button>
                    </div>
                    <div className="tagform_taglists">
                      <h4 className="taglists_title">Current tags, click to delete a tag</h4>
                      <div className="taglists">
                        {tags.map((tag, i) => (
                          <span className="tag" key={i} onClick={() => removeTag(i)}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal_footer">
                  <button className="btn" onClick={applyEdit}>Apply changes</button>
                </div>
              </Modal>
            </div>
            </div>
          </div>
        )) : notes.length && query.length ?  <p className="note_isempty"> No matching searches found </p> : ""}
        </div>
      </div>
    </div>
  );
}
