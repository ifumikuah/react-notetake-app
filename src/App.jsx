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
  },
};

const note0 = {
  id: 0,
  title: "First note",
  content: "Contains about first note",
  tags: ["one", "two", "seven"],
}

const note1 = {
  id: 1,
  title: "Second note",
  content: "Contains about second note",
  tags: ["one", "three", "four"],
}

const note2 = {
  id: 2,
  title: "Third note",
  content: "Contains about third note",
  tags: ["two", "five", "six", "one"],
}

const note3 = {
  id: 3,
  title: "Fourth note",
  content: "Contains about fourth note",
  tags: ["seven", "eight", "nine", "four"],
}

const allexamplenotes = [note0, note1, note2, note3]

export default function App() {
  const [notes, setNotes] = useState([...allexamplenotes]);
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
          allTags.splice(allTags.indexOf(y), 1).push(y);
        }
        allTags.push(y);
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
    <div className="App">
      <div className="App_side">
        <div className="App_header">
          <h1 className="App_title">Notetake</h1>
        </div>
        <div className="query_container">
          <input type="text"/>
        </div>
          {listAllTag()
            .reverse()
            .map((x, i) => (
              <span key={i}> {x} </span>
            ))}
      </div>
      <div className="App_main">
        {notes.map((n) => (
          <li key={n.id}>
            {n.id} {n.title} Tags: {n.tags.join(", ")}{" "}
            <span>
              <div className="edit_modal">
                <button onClick={() => openEditModal(n.id)}>Open Modal</button>
                <Modal
                  isOpen={editIsOpen === n.id}
                  onRequestClose={() => closeEditModal(n.id)}
                  style={modalStyles}
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
            style={modalStyles}
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
              {tags.map((tag, i) => (
                <span className="tag" key={i} onClick={() => removeTag(i)}>
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
      </div>
    </div>
  );
}
