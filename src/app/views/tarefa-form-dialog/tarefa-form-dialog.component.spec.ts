import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaFormDialogComponent } from './tarefa-form-dialog.component';

describe('TarefaFormDialogComponent', () => {
  let component: TarefaFormDialogComponent;
  let fixture: ComponentFixture<TarefaFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefaFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
