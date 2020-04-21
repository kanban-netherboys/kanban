/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRow2Component } from './user-row2.component';

describe('UserRow2Component', () => {
  let component: UserRow2Component;
  let fixture: ComponentFixture<UserRow2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRow2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRow2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
