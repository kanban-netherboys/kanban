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

  tasks: Task[];
  backlog = [];
  next = [];
  inProgress = [];
  done = [];

  constructor(private taskService: TaskService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((res: {kanbanList: Task[]}) => {
      this.tasks = res.kanbanList;
      this.backlog = res.kanbanList.filter(task => task.status === 'Backlog');
      this.next = res.kanbanList.filter(task => task.status === 'Next');
      this.inProgress = res.kanbanList.filter(task => task.status === 'InProgress');
      this.done = res.kanbanList.filter(task => task.status === 'Done');

    });
  }

  // addTask(taskData: Task) {
  //   this.taskService.addTask(taskData).subscribe();
  // }

  // getSingleTask(id: number) {
  //   this.taskService.getSingleTask(id).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  addTaskDialog(status: string) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { status: status }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasks();
    });
  }

  editTaskDialog(id: number) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { id: id}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasks();
    });
  }

  drop(event, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const title = event.container.data[event.currentIndex].title;
      const description = event.container.data[event.currentIndex].description;
      const id = event.container.data[event.currentIndex].id;
      this.taskService.patchTask({title, description, status}, id).subscribe();
    }
  }

}
