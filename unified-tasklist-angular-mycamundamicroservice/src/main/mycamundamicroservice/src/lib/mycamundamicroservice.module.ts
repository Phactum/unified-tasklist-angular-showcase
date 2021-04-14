import { NgModule, Injector } from '@angular/core';
import { MyFormComponent } from './myform.component';
import { CommonModule } from '@angular/common';
import { MycamundamicroserviceService } from './mycamundamicroservice.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MyFormComponent],
  providers: [{
    provide: MycamundamicroserviceService,
    deps: [Injector]
  }]

})
export class MycamundamicroserviceModule { }
