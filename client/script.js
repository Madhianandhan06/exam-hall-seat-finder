async function searchSeat() {
  const regNo = document.getElementById("regNo").value.trim();
  const result = document.getElementById("result");

  // clear previous content/styles
  result.innerHTML = "";
  result.classList.remove("error");

  if (!regNo) {
    result.textContent = "Please enter your register number.";
    result.classList.add("error");
    return;
  }

  const res = await fetch(
    `https://exam-hall-seat-finder.onrender.com/api/student/search?regNo=${regNo}`
  );

  const data = await res.json();

  if (!res.ok) {
    result.textContent = "No exam data available for that register number.";
    result.classList.add("error");
    return;
  }

  // build a table for the returned data
  const html = `
    <table class="result-table">
      <tr><th>Name</th><td>${data.name}</td></tr>
      <tr><th>Register No</th><td>${data.regNo}</td></tr>
      <tr><th>Department</th><td>${data.department}</td></tr>
      <tr><th>Hall</th><td>${data.hall}</td></tr>
      <tr><th>Seat No</th><td>${data.seatNo}</td></tr>
      <tr><th>Subject</th><td>${data.subject}</td></tr>
      <tr><th>Date</th><td>${data.date}</td></tr>
      <tr><th>Session</th><td>${data.session}</td></tr>
      <tr><th>Exam ID</th><td>${data.examId}</td></tr>
    </table>
  `;

  result.innerHTML = html;
}

