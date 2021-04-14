import { Injectable } from '@angular/core';
import { MycamundamicroserviceModule } from './mycamundamicroservice.module';
import { MyformkeyApi, Configuration, MyFormActions, MyFormDetails } from '../client/api';

@Injectable({
  providedIn: MycamundamicroserviceModule
})
export class MycamundamicroserviceService {

  private myformkeyClient: MyformkeyApi;

  constructor() {
    const apiConfig: Configuration = new Configuration({
      basePath: '/mycamundamicroservice/api/v1'
    });
    this.myformkeyClient = new MyformkeyApi(apiConfig);
  }

  async getMyFormUserTaskDetails(taskId: string): Promise<MyFormDetails> {
    return this.myformkeyClient.getDetailsForMyFormUserTask({ taskId });
  }

  async completeMyFormUserTask(taskId: string, action: MyFormActions, comment: string):
      Promise<MyFormDetails> {
    return this.myformkeyClient.completeMyFormUserTask({
      taskId,
      myFormCompleteDetails: {
        action, comment
      }});
  }

}
