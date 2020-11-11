import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryconfigComponent } from './countryconfig.component';

describe('CountryconfigComponent', () => {
  let component: CountryconfigComponent;
  let fixture: ComponentFixture<CountryconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
