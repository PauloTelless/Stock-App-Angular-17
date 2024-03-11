import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationUserComponent } from './configuration-user.component';

describe('ConfigurationUserComponent', () => {
  let component: ConfigurationUserComponent;
  let fixture: ComponentFixture<ConfigurationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
