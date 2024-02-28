import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponentComponent } from './edit-product.component';

describe('EditComponentComponent', () => {
  let component: EditComponentComponent;
  let fixture: ComponentFixture<EditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
