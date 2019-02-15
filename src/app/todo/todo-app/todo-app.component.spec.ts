import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { TodoAppComponent } from './todo-app.component';
import { TodoFormComponent, TodoListComponent, TodoComponent } from '@todo';
import { SharedModule } from '@shared';
import { of, Observable } from 'rxjs';
import { Todo } from '@core/model';
import { List, is } from 'immutable';
import { TodoEvent } from '@todo/todo-event';

class TodoMockService {
  getAll(): Observable<Todo[]> {
    const todos: Todo[] = [
      {checked: false, title: '1'}
    ];
    return of(todos);
  }
}

describe('TodoAppComponent', () => {
  let component: TodoAppComponent;
  let fixture: ComponentFixture<TodoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [TodoAppComponent, TodoFormComponent, TodoListComponent, TodoComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial todos', () => {
    // Arrange
    const mockTodos: Todo[] = [
      {checked: false, title: '1'}
    ];
    spyOn(component.todoS, 'getAll').and.returnValue(of(mockTodos));
    // Act
    component.ngOnInit();
    // Assert
    const comp = is(component.todos, List(mockTodos));
    expect(comp).toBeTruthy();
  });

  it('should add new todo', () => {
    // Arrange
    const mockTodo: Todo = {checked: false, title: '1', id: 1};
    spyOn(component.todoS, 'add').and.returnValue(of(mockTodo));
    // Act
    component.onTodoAdded(mockTodo);
    // Assert
    expect(component.todoS.add).toHaveBeenCalledWith(mockTodo);
  });

  it('should edit todo', () => {
    // Arrange
    const mockTodo: Todo = {checked: false, title: '1', id: 1};
    spyOn(component.todoS, 'edit').and.returnValue(of(mockTodo));
    const editTodoEvent: TodoEvent = {event: 'Edited', todo: mockTodo};
    // Act
    component.onTodoChanged(editTodoEvent);
    // Assert
    expect(editTodoEvent.event).toBe('Edited');
    expect(component.todoS.edit).toHaveBeenCalledWith(mockTodo);
  });

  it('should remove todo', () => {
    // Arrange
    const mockTodo: Todo = {checked: false, title: '1', id: 1};
    spyOn(component.todoS, 'remove').and.returnValue(of(null));
    const removeTodoEvent: TodoEvent = {event: 'Removed', todo: mockTodo};
    // Act
    component.onTodoChanged(removeTodoEvent);
    // Assert
    expect(removeTodoEvent.event).toBe('Removed');
    expect(component.todoS.remove).toHaveBeenCalledWith(mockTodo);
  });
});
