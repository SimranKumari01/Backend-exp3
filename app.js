const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const employeesFilePath = path.join(__dirname, 'employees.json');

// Helper functions to read and write employees from/to the JSON file
const readEmployees = () => {
  if (!fs.existsSync(employeesFilePath)) return [];
  const data = fs.readFileSync(employeesFilePath);
  return JSON.parse(data);
};

const writeEmployees = (employees) => {
  fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2));
};

// Render the landing page with buttons
app.get('/', (req, res) => {
  res.render('index');
});

// Render the calculate salary page
app.get('/calculate-salary', (req, res) => {
  const employees = readEmployees();
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  res.render('calculate-salary', { totalSalary });
});

// Render the signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup form submission
app.post('/signup', (req, res) => {
  const { name, position, salary } = req.body;

  if (!name || !position || !salary) {
    return res.status(400).send('All fields are required.');
  }

  const employees = readEmployees();
  employees.push({ name, position, salary: parseFloat(salary) });
  writeEmployees(employees);

  res.status(201).send('Employee registered successfully.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
