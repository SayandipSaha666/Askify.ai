const form = document.getElementById("uploadForm");
const pdfFileInput = document.getElementById("pdfFile");
const filenameInput = document.getElementById("filename");
const statusMsg = document.getElementById("statusMsg");
const convertBtn = document.getElementById("convertBtn");
const downloadLink = document.getElementById("downloadLink");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const file = pdfFileInput.files[0];
//   const filename = filenameInput.value.trim();

//   if (!file || !filename) {
//     alert("Please select a PDF and enter a filename!");
//     return;
//   }

//   // Show processing status
//   statusMsg.classList.remove("hidden");
//   convertBtn.disabled = true;

//   const formData = new FormData();
//   formData.append("pdf_file", file);
//   formData.append("filename", filename);

//   try {
//     // Upload the PDF
//     const uploadRes = await fetch("/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const uploadData = await uploadRes.json();
//     if (uploadData.msg !== "success") {
//       throw new Error("PDF upload failed");
//     }

//     // Analyze the PDF to generate CSV
//     const analyzeRes = await fetch("/analyze", {
//       method: "POST",
//       body: new URLSearchParams({ pdf_filename: uploadData.pdf_filename }),
//     });

//     const analyzeData = await analyzeRes.json();
//     if (!analyzeData.output_file) {
//       throw new Error("CSV generation failed");
//     }

//     // Show download button
//     downloadLink.href = "/download";
//     downloadLink.classList.remove("hidden");
//     alert("CSV generated successfully! Click the download button.");
//   } catch (err) {
//     alert("Error: " + err.message);
//   } finally {
//     statusMsg.classList.add("hidden");
//     convertBtn.disabled = false;
//   }
// });

document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  document.getElementById('statusMsg').classList.remove('hidden');
  document.getElementById('statusMsg').textContent = 'Uploading...';

  const pdfFile = document.getElementById('pdfFile').files[0];
  const filename = document.getElementById('filename').value;

  if (!pdfFile || !filename) {
    document.getElementById('statusMsg').textContent = 'Please select a PDF and enter a filename.';
    return;
  }

  // 1. Upload PDF
  const formData = new FormData();
  formData.append('pdf_file', pdfFile);
  formData.append('filename', filename);

  let uploadResp = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  let uploadData = await uploadResp.json();
  if (!uploadResp.ok) {
    document.getElementById('statusMsg').textContent = uploadData.msg || 'Upload failed.';
    return;
  }

  document.getElementById('statusMsg').textContent = 'Analyzing...';

  // 2. Analyze PDF
  let analyzeResp = await fetch('/analyze', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `pdf_filename=${encodeURIComponent(uploadData.pdf_filename)}`
  });
  let analyzeData = await analyzeResp.json();
  if (!analyzeResp.ok) {
    document.getElementById('statusMsg').textContent = analyzeData.msg || 'Analysis failed.';
    return;
  }

  document.getElementById('statusMsg').textContent = 'Done! Download your CSV below.';
  let downloadLink = document.getElementById('downloadLink');
  downloadLink.href = '/download';
  downloadLink.classList.remove('hidden');
});