export interface UserTaskFormComponent {
  taskId: string;
  tenant: string;
  formKey: string;
  readOnly: boolean;
  task: any; // type has to be defined
}
