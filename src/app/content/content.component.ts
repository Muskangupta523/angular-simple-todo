import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  tasks: { id: number; text: string }[] = [];
  newTaskText: string = '';
  newTaskNumber: number | null = null;
  editingTaskId: number | null = null;

  ngOnInit() {
    // Load tasks from local storage on component initialization
    this.loadTasksFromLocalStorage();
  }

  updateLocalStorage() {
    // Save tasks to local storage whenever there's a change
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage() {
    // Load tasks from local storage
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  addTask() {
    if (this.newTaskText.trim() !== '' && this.newTaskNumber !== null) {
      const newTask = { id: Date.now(), text: this.newTaskText.trim(), number: this.newTaskNumber };
      this.tasks.push(newTask);
      this.newTaskText = '';
      this.newTaskNumber = null;
      this.updateLocalStorage();
    }
  }

  removeTask(task: { id: number; text: string }) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
  }

  startEditing(taskId: number) {
    this.editingTaskId = taskId;
  }

  cancelEditing() {
    this.editingTaskId = null;
  }

  saveTaskChanges(task: { id: number; text: string }) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index].text = task.text;
    this.editingTaskId = null;
    this.updateLocalStorage();
  }
}
