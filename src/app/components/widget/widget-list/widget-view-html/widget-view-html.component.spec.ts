import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetViewHtmlComponent } from './widget-view-html.component';

describe('WidgetViewHtmlComponent', () => {
  let component: WidgetViewHtmlComponent;
  let fixture: ComponentFixture<WidgetViewHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetViewHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetViewHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
