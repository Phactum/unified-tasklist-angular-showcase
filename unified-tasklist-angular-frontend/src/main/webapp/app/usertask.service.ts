import { Injectable } from '@angular/core';
import { UserTaskInstance, UserTasksApi, Configuration } from 'client/api';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  tasksClient: UserTasksApi;

  constructor() {
    const config: Configuration = new Configuration({
      basePath: `${document.location.pathname}/frontend-api/v1`.replace(/\/\//g, '/')
    });
    this.tasksClient = new UserTasksApi(config);
  }

  async getUserTaskById(taskId: string): Promise<UserTaskInstance> {
    return this.tasksClient.getUserTaskDetails({ taskId });
  }

  async getUserTasks(): Promise<Array<UserTaskInstance>> {
    return this.tasksClient.getUserTasksDetails();
  }

}
