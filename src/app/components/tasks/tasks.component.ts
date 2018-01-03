import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TaskService } from '../../services/task.service';

import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  editState: boolean = false;
  taskToEdit: Task;
  public search = true;

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
      this.search = false;
    });
  }

  deleteTask(event, task) {
    const response = confirm('Are you sure you want to delete?');
    if (response ) {
      this.taskService.deleteTask(task);
    }
    return;
  }

  editTask(event, task) {
    this.editState = !this.editState;
    this.taskToEdit = task;
  }

  updateTask(task) {
    this.taskService.updateTask(task);
    this.taskToEdit = null;
    this.editState = false;
  }

  finishTask(event,task) {
    // console.log(id_task);
    for (var i = 0; i < this.tasks.length; i++) {
       if (this.tasks[i]['id'] == task.id) {
        this.tasks[i]['status'] = !this.tasks[i]['status'];
        this.taskService.updateTask(task);
      }
    }
  }



}
