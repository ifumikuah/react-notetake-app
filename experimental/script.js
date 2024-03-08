const note0 = {
  id: 0,
  title: "Alpha Bravo",
  content: "This is a note about the NATO phonetic alphabet.",
  tags: ["Alpha", "Bravo", "Charlie"],
};

const note1 = {
  id: 1,
  title: "Delta Echo",
  content: "A note discussing Delta and Echo.",
  tags: ["Delta", "Hotel", "Charlie"],
};

const note2 = {
  id: 2,
  title: "Hotel India",
  content: "Hotel India represents HI.",
  tags: ["Hotel"],
};

const note3 = {
  id: 3,
  title: "Mike November",
  content: "The Mike November note.",
  tags: ["Mike", "Delta", "Oscar"],
};

const note4 = {
  id: 4,
  title: "Sierra Tango",
  content: "Note discussing Sierra and Tango.",
  tags: ["Sierra", "Oscar"],
};

const notess = [note0, note1, note2, note3, note4];

function queryTagsTest(tag, array) {
  return array.map((note, i1) => {
    return note.tags
      .map((s) => s.toLowerCase().includes(tag.toLowerCase()))
      .some((x) => x);
  });
}

// Implementasi query tag

function queryTags(str, array) {
  return array.filter((note) =>
    note.tags.some((tag) => tag.toLowerCase().includes(str.toLowerCase()))
  );
}

console.log(queryTags("alpha", notess));
