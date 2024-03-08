import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserSuccessComponent } from './delete-user-success.component';

describe('DeleteUserSuccessComponent', () => {
  let component: DeleteUserSuccessComponent;
  let fixture: ComponentFixture<DeleteUserSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteUserSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
