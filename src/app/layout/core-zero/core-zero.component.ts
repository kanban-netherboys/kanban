import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-core-zero',
  templateUrl: './core-zero.component.html',
  styleUrls: ['./core-zero.component.scss']
})
export class CoreZeroComponent implements OnInit {

  backlog = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  next = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  inProgress = [
    'Siema',
    'Co tam',
    'Byku',
    'slychac',
    'u ciebie'
  ];

  done = [
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno'
  ];

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
