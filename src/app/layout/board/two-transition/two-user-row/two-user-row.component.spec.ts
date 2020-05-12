/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwoUserRowComponent } from './two-user-row.component';

describe('TwoUserRowComponent', () => {
  let component: TwoUserRowComponent;
  let fixture: ComponentFixture<TwoUserRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoUserRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoUserRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
