const noteList = document.getElementById('noteList');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const saveNote = document.getElementById('saveNote');
const clearForm = document.getElementById('clearForm');

function loadNotes() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(notes => {
            noteList.innerHTML = '';
            notes.forEach(note => {
                const li = document.createElement('li');
                li.textContent = note.title;
                li.onclick = () => loadNoteContent(note);
                noteList.appendChild(li);
            });
        });
}

function loadNoteContent(note) {
    noteTitle.value = note.title;
    noteText.value = note.text;
}

saveNote.onclick = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value
    };
    fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
    })
    .then(response => response.json())
    .then(note => {
        loadNotes();
        noteTitle.value = '';
        noteText.value = '';
    });
};

clearForm.onclick = () => {
    noteTitle.value = '';
    noteText.value = '';
};

loadNotes();
