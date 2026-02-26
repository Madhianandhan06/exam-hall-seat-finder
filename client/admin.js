const adminKeyInput = document.getElementById("adminKey");
const examIdInput = document.getElementById("examId");
const excelFileInput = document.getElementById("excelFile");
const statusText = document.getElementById("status");
const historyList = document.getElementById("historyList");

// Upload Excel
async function uploadExcel() {
  const adminKey = adminKeyInput.value.trim();
  const examId = examIdInput.value.trim();
  const file = excelFileInput.files[0];

  if (!adminKey || !examId || !file) {
    statusText.innerText = "All fields are required.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("examId", examId);

  const res = await fetch("https://exam-hall-seat-finder.onrender.com/api/admin/upload", {
    method: "POST",
    headers: { "x-admin-key": adminKey },
    body: formData
  });

  const data = await res.json();

  statusText.innerText = res.ok
    ? `Uploaded successfully (${data.records} records)`
    : data.error;

  loadHistory();
}

// Load upload history
async function loadHistory() {
  const adminKey = adminKeyInput.value.trim();
  historyList.innerHTML = "";

  if (!adminKey) return;

  const res = await fetch("https://exam-hall-seat-finder.onrender.com/api/admin/history", {
    headers: { "x-admin-key": adminKey }
  });

  const uploads = await res.json();

  uploads.forEach(upload => {
    const card = document.createElement("div");
    card.className = "history-item";

    card.innerHTML = `
      <div>
        <strong>${upload.fileName}</strong>
        <div class="muted">${new Date(upload.uploadedAt).toLocaleString()}</div>
      </div>
      <button class="danger" onclick="deleteUpload('${upload._id}')">
        Remove
      </button>
    `;

    historyList.appendChild(card);
  });
}

// Delete upload
async function deleteUpload(id) {
  const adminKey = adminKeyInput.value.trim();
  if (!confirm("This will permanently delete exam data. Continue?")) return;

  await fetch(`https://exam-hall-seat-finder.onrender.com/api/admin/delete/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey }
  });

  loadHistory();
}

adminKeyInput.addEventListener("blur", loadHistory);
