// Handle salary calculation form submission
document.getElementById('salary-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const baseSalary = parseFloat(document.getElementById('base-salary').value);
    const bonus = parseFloat(document.getElementById('bonus').value);
    const tax = parseFloat(document.getElementById('tax').value);
  
    fetch('/calculate-salary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseSalary, bonus, tax }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('net-salary').innerText = `Net Salary: ${data.netSalary}`;
      });
  });
  