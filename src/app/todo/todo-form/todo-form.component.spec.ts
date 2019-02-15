import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { TodoFormComponent } from '@todo';
import { Todo } from '@core/model';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TodoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new todo', () => {
    // Arrange
    const spy = spyOn(component.todoAdded, 'emit');
    component.title = 'newTodoTitle';
    const todo: Todo = {
      checked: false,
      title: component.title
    };
    // Act
    component.onSubmit();
    // Assert
    expect(spy).toHaveBeenCalledWith(todo);
  });
});
