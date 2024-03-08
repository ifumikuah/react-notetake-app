import { useState, useRef } from "react";
import Modal from "react-modal";
import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const idRef = useRef(null);

  const addNote = () => {
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
  };

  const addTag = () => {
    const store = [];
    store.push(tag.toLowerCase());

    setTags((prevTags) => [...prevTags, ...store]);
    setTag("");
  };

  const removeTag = (id) => {
    setTags((prevTags) => prevTags.filter((_, i) => id !== i));
  };

  const listAllTag = () => {
    let allTags = [];
  
    notes.forEach((x) =>
      x.tags.forEach((y) => {
        if (allTags.includes(y)) {
          allTags.splice(allTags.indexOf(y), 1).push(y)
        }
        allTags.push(y)
      })
    );

    return allTags;
  };

  const applyEdit = () => {
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
  };

  // Add Modals

  const [addModalIsOpen, setAddIsOpen] = useState(false);

  function openAddModal() {
    setAddIsOpen(true);
  }

  function closeAddModal() {
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
    <>
      <div>
        <p> Available tags </p>
        {listAllTag()
          .reverse()
          .map((x, i) => (
            <span key={i}> {x} </span>
          ))}
      </div>
      <div>
        {notes.map((n) => (
          <li key={n.id}>
            {n.id} {n.title} Tags: {n.tags.join(", ")}{" "}
            <span>
              <div className="edit_modal">
                <button onClick={() => openEditModal(n.id)}>Open Modal</button>
                <Modal
                  isOpen={editIsOpen === n.id}
                  onRequestClose={() => closeEditModal(n.id)}
                  style={customStyles}
                  contentLabel="Edit Modal"
                  ariaHideApp={false}
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={applyEdit}>Add Note</button>
                  </div>
                  <div>
                    {tags.map((tag, i) => (
                      <span
                        className="tag"
                        key={i}
                        onClick={() => removeTag(i)}
                      >
                        {" "}
                        {tag}{" "}
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <button onClick={addTag}>Add Tag</button>
                  </div>
                </Modal>
              </div>
            </span>
          </li>
        ))}
        <div>
          <button onClick={openAddModal}>Open Modal</button>
          <Modal
            isOpen={addModalIsOpen}
            onRequestClose={closeAddModal}
            style={customStyles}
            contentLabel="Add Modal"
            ariaHideApp={false}
          >
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={addNote}>Add Note</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button onClick={addTag}>Add Tag</button>
            </div>
          </Modal>
        </div>
      </div>

      <div></div>
    </>
  );
}
