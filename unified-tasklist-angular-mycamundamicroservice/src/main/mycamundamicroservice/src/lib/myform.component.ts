import { Component, OnInit } from '@angular/core';
import { UserTaskFormComponent } from '@unified-tasklist/common';
import { MycamundamicroserviceService } from './mycamundamicroservice.service';
import { MyFormDetails, MyFormActions } from '../client/api';
import deepPropsGet from 'deep-props.get';

@Component({
  selector: 'mycamundamicroservice-myformkey',
  template: `
    <div *ngIf="details">
      <p>Mycamundamicroservice MyForm works! Task is {{task.status}}.</p>
      <ul>
        <li>Info: {{details && details.myFormInfo || 'undefined'}}</li>
      </ul>
      <p>
        Comment:
        <textarea [disabled]="readOnly" type="text" [(ngModel)]="comment"></textarea>
      </p>
      <button *ngFor="let action of details.availableActions"
          [disabled]="readOnly"
          (click)="complete(action)"
          [ngStyle]="{'background-color': completedWithAction() == action ? 'green' : 'light-grey'}"
          >{{action}}</button>
    </div>
  `,
  styles: [
  ]
})
export class MyFormComponent implements OnInit, UserTaskFormComponent {

  taskId: string;

  tenant: string;

  formKey: string;

  task: any;

  readOnly: boolean;

  details: MyFormDetails;

  comment: string;

  constructor(private mycamundamicroserviceService: MycamundamicroserviceService) { }

  async ngOnInit(): Promise<void> {
    this.details = await this.mycamundamicroserviceService.getMyFormUserTaskDetails(this.taskId);
    this.comment = deepPropsGet(this.details, 'completedWith.comment');
  }

  async complete(action: MyFormActions): Promise<void> {
    this.details = await this.mycamundamicroserviceService.completeMyFormUserTask(this.taskId, action, this.comment);
    this.readOnly = true;
  }

  completedWithAction(): string {
    return deepPropsGet(this.details, 'completedWith.action');
  }

}
