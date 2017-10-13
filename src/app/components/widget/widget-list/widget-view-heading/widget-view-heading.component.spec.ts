import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetViewHeadingComponent } from './widget-view-heading.component';

describe('WidgetViewHeadingComponent', () => {
  let component: WidgetViewHeadingComponent;
  let fixture: ComponentFixture<WidgetViewHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetViewHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetViewHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
