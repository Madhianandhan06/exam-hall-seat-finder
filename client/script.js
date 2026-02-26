async function searchSeat() {
  const regNo = document.getElementById("regNo").value.trim();
  const result = document.getElementById("result");

  if (!regNo) {
    result.innerText = "Please enter your register number.";
    return;
  }

  const res = await fetch(
    `http://localhost:5000/api/student/search?regNo=${regNo}`
  );

  const data = await res.json();

  if (!res.ok) {
    result.innerText = "No exam data available.";
    return;
  }

  result.innerText = `
Name        : ${data.name} 
Register No : ${data.regNo}
Department  : ${data.department}
Hall        : ${data.hall}
Seat No     : ${data.seatNo}
Subject     : ${data.subject}
Date        : ${data.date}
Session     : ${data.session}
Exam ID     : ${data.examId}
  `;
}
