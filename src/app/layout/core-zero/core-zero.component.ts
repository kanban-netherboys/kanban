import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-core-zero',
  templateUrl: './core-zero.component.html',
  styleUrls: ['./core-zero.component.scss']
})
export class CoreZeroComponent implements OnInit {

  task: Task;

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

  constructor(private taskService: TaskService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(res => {
      console.log(res);
    });
  }

  getSingleTask(id: number) {
    this.taskService.getSingleTask(id).subscribe((res: {kanbanList: Task[]}) => {
      console.log(res.kanbanList);
    });
  }

  addTaskDialog() {
    return this.dialogService.openDialog(AddTaskPopUpComponent);
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
