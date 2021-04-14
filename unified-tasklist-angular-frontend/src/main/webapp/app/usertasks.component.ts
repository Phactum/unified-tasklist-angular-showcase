import { Component, OnInit } from '@angular/core';
import { UserTaskInstance } from 'client/api';
import { UserTaskService } from './usertask.service';

@Component({
  selector: 'app-usertasks',
  templateUrl: './usertasks.component.html',
  styleUrls: []
})
export class UserTasksComponent implements OnInit {

  tasks: Array<UserTaskInstance>;

  selectedTask: UserTaskInstance;

  constructor(private userTaskService: UserTaskService) { }

  async ngOnInit(): Promise<any> {
    this.tasks = await this.userTaskService.getUserTasks();
  }

  selectTask(taskClicked: UserTaskInstance): void {
    if (this.selectedTask && this.selectedTask.id === taskClicked.id) {
      this.selectedTask = undefined;
    } else {
      this.selectedTask = taskClicked;
    }
  }

}
