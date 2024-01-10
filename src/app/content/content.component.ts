import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  
  tasks: { id: number; text: string; }[] = [];
  newTaskText: string = '';
  // newTaskNumber: number | null = null;
  // newTaskText2: string = '';
  editingTaskId: number | null = null;
  isTextValid: boolean = true;
  isTextTouched: boolean = false;
  // isNumberValid: boolean = true;
  // isText2Valid: boolean = true;
  newTaskTextControl = new FormControl('', [
    Validators.required,
    Validators.minLength(7)
  ]);


  ngOnInit() {
    // Load tasks from local storage on component initialization
    this.loadTasksFromLocalStorage();
    this.newTaskTextControl.markAsTouched();
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
    if (this.isInputValid()) {
      const newTask = {
        id: Date.now(),
        text: this.newTaskText.trim(),
        // number: this.newTaskNumber!,
        // text2: this.newTaskText2.trim()
      };

      this.tasks.push(newTask);
      this.newTaskText = '';
      // this.newTaskNumber = null;
      // this.newTaskText2 = '';
      this.isTextValid = true;
      // this.isNumberValid = true;
      // this.isText2Valid = true;

      this.updateLocalStorage();
      this.newTaskTextControl.reset(); // Reset the form control
      this.newTaskTextControl.markAsTouched(); // Mark as touched to trigger validation messages

      // Rest of your code...
    } else {
      console.log("Please fill in the form correctly.");
    }
  
  }

  isInputValid(): boolean {
    // Validate newTaskText
    this.isTextValid = /^[a-z]{7,}$/.test(this.newTaskText.trim());
    this.isTextTouched = true;

    // Validate newTaskNumber
    // this.isNumberValid = /^[0-9]+$/.test(String(this.newTaskNumber));

    // Validate newTaskText2
    // this.isText2Valid= /^[A-Z]{7,}$/.test(this.newTaskText2.trim());
    // this.isText2Valid = typeof this.newTaskText2 === 'string' && this.newTaskText2.trim() !== '';

    // Return true only if all inputs are valid
    return this.isTextValid;
    
    // return this.isTextValid && this.isNumberValid && this.isText2Valid;
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
