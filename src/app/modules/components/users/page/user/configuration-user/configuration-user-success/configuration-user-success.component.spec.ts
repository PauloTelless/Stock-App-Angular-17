import { ComponentFixture, TestBed } from '@angular/core/testing';

import ConfigurationUserSuccessComponent from './configuration-user-success.component';

describe('ConfigurationUserSuccessComponent', () => {
  let component: ConfigurationUserSuccessComponent;
  let fixture: ComponentFixture<ConfigurationUserSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationUserSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationUserSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
