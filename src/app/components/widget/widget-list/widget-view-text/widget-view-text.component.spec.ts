import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetViewTextComponent } from './widget-view-text.component';

describe('WidgetViewTextComponent', () => {
  let component: WidgetViewTextComponent;
  let fixture: ComponentFixture<WidgetViewTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetViewTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetViewTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
