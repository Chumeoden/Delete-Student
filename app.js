const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

let dsSV = [
  { id: 1, name: "Linh", email: "linh@example.com", phone: '0901223333' },
  { id: 2, name: "Truong", email: "truong@example.com", phone: '0933533556' },
  { id: 3, name: "Tin", email: "tin@example.com", phone: '0933533556' },
  { id: 4, name: "Luong", email: "luong@example.com", phone: '0933533556' },
];

app.get('/', (req, res) => {
  res.render('home', { danhSach: dsSV });
});

app.get('/delete/:id', (req, res) => {
  let studentId = req.params.id;
  let index = dsSV.findIndex(item => item.id == studentId);
  if (index !== -1) {
    dsSV.splice(index, 1);
  }
  res.redirect('/');
});

app.post('/add', (req, res) => {
  const newStudent = {
    id: dsSV.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  dsSV.push(newStudent);
  res.redirect('/');
});

app.get('/student/:id', (req, res) => {
  let studentId = req.params.id;
  let student = dsSV.find(item => item.id == studentId);
  if (student) {
    res.render('student', { 'student': student });
  } else {
    res.send('Not found!');
  }
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});
