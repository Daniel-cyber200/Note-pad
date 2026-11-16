import express from "express";
import fs from "fs";
import path from "path";
const app = express();
const PORT = 3000;
// Middleware: Allows Express to read JSON data sent in Postman's request body
app.use(express.json());
// Path to our JSON "database" file
const DATA_FILE = path.join(__dirname, 'notes.json');
// --- HELPER FUNCTIONS ---
// 1. Read notes from the file and convert text to a JS array
function readNotes() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}
// 2. Convert JS array back to text and save it to the file
function writeNotes(notes) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}
// --- ROUTES ---
// 1. VIEW ALL NOTES (GET /notes)
app.get('/notes', (req, res) => {
    const notes = readNotes();
    res.status(200).json(notes);
});
// 2. CREATE A NEW NOTE (POST /notes)
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    // Basic validation
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }
    const notes = readNotes();
    const newNote = {
        id: Date.now().toString(), // Generates a simple unique ID
        title,
        content,
        createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    writeNotes(notes); // Save updated list back to notes.json
    res.status(201).json(newNote);
});
// --- TODO: ADD YOUR REMAINING 3 ROUTES HERE ---
// 3. VIEW ONE NOTE   -> app.get('/notes/:id', ...)
// 4. EDIT A NOTE     -> app.put('/notes/:id', ...)
// 5. DELETE A NOTE   -> app.delete('/notes/:id', ...)
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map