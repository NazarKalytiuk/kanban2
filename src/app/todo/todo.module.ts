import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TodoAppComponent, TodoFormComponent, TodoListComponent, TodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [TodoAppComponent]
})
export class TodoModule { }
