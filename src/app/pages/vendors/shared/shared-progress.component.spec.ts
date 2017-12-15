import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesharedComponent } from './shared-progress.component';

describe('PagesharedComponent', () => {
  let component: PagesharedComponent;
  let fixture: ComponentFixture<PagesharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
