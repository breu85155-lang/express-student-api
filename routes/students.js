const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');

let students = [
    { id: 1, name: 'Alice', course: 'React' },
    { id: 2, name: 'Bob', course: 'Node.js' }
];

router.get('/', requireAuth, (req, res) => {
    res.json(students);
});

router.get('/:id', requireAuth, (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
});

router.post('/', requireAuth, (req, res) => {
    const { name, course } = req.body;
    const newStudent = { id: students.length + 1, name, course };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

router.delete('/:id', requireAuth, (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);
    if (index === -1) return res.status(404).json({ error: 'Student not found' });
    const deletedStudent = students.splice(index, 1)[0];
    res.json(deletedStudent);
});

module.exports = router;