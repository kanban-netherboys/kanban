/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwimlaneComponent } from './swimlane.component';

describe('TwoUserRowComponent', () => {
  let component: SwimlaneComponent ;
  let fixture: ComponentFixture<SwimlaneComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimlaneComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
