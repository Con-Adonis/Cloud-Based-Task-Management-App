document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    dueDate: document.getElementById("dueDate").value,
    assignedTo: document.getElementById("assignedTo").value.trim(),
    isImportant: document.getElementById("important").checked,
  };

  console.log("Task created:", task);

  // Clear form
  this.reset();
});
