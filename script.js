document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

let taskList = [];

function saveTaskList() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask() {
  const course = document.getElementById("course").value;
  const task = document.getElementById("task").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!task || !date || !time) {
    Swal.fire("Info!", "Kolomnya Wajib Diisi Semua Yaaa", "warning");
    return;
  }

  const taskItem = { course, task, date, time };
  taskList.push(taskItem);
  saveTaskList();
  displayTasks();

  // Reset form fields
  document.getElementById("course").value = "";
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";

  Swal.fire("Berhasil", "Tugas Sudah Ditambahkan");
}

function removeTask(button) {
  Swal.fire({
    title: "Yakin Mau Dihapus?",
    text: "Tugasnya Udah Selesai?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sudah",
  }).then((result) => {
    if (result.isConfirmed) {
      const index = button.parentElement.dataset.index;
      taskList.splice(index, 1);
      saveTaskList();
      displayTasks();

      Swal.fire("Berhasil", "Tugas Sudah Selesai dan Sudah Terhapus");
    }
  });
}

function displayTasks() {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = "";

  taskList.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.dataset.index = index;
    taskItem.innerHTML = `
      <div>
        <strong>${task.course}</strong>
      </div>
      <div>
        ${task.task}
      </div>
      <div>
        Tanggal: ${task.date} | Jam: ${task.time}
      </div>
      <button onclick="removeTask(this)">Hapus</button>
    `;

    taskListElement.appendChild(taskItem);
  });
}

const savedTaskList = JSON.parse(localStorage.getItem("tasks")) || [];
taskList = savedTaskList;
displayTasks();
