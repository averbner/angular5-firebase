import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent implements OnInit {
  task: Task = {
   title: '',
   description: '',
   status: true
  };
  public open: boolean;

  constructor(private taskService: TaskService) {
    this.open = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.task.title != '' && this.task.description != '') {
      this.taskService.addTask(this.task);
      this.task.title = '';
      this.task.description = '';
    }
    this.open = false;
  }

  changeOpen() {
    this.open = !this.open;
  }

}
