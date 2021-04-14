import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTaskComponent } from './usertask.component';
import { UserTasksComponent } from './usertasks.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTaskComponent,
    UserTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
