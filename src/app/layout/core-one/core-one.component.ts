import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-core-one',
  templateUrl: './core-one.component.html',
  styleUrls: ['./core-one.component.scss']
})
export class CoreOneComponent implements OnInit {

  WIPLimit = 3;
  limitWarning = 'Exceeded!';

  tasks: Task[];
  backlog = [];
  next = [];
  inProgress = [];
  done = [];

  inProgress0 = [];
  inProgress1 = [];
  inProgress2 = [];
  inProgress3 = [];
  inProgress4 = [];
  inProgress5 = [];

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


      this.inProgress0 = res.kanbanList.filter(task => task.status === 'InProgress' && task.progressStatus === 0);
      this.inProgress1 = res.kanbanList.filter(task => task.status === 'InProgress' && task.progressStatus === 1);
      this.inProgress2 = res.kanbanList.filter(task => task.status === 'InProgress' && task.progressStatus === 2);
      this.inProgress3 = res.kanbanList.filter(task => task.status === 'InProgress' && task.progressStatus === 3);
      this.inProgress4 = res.kanbanList.filter(task => task.status === 'InProgress' && task.progressStatus === 4);
      this.inProgress5 = res.kanbanList.filter(task => task.status === 'InProgress' && task.progressStatus === 5);
    });
  }

  addTaskDialog(status: string) {
      const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
        data: { status: status },
        height: '430px',
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getAllTasks();
      });
  }

  editTaskDialog(id: number) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { id: id},
      height: '430px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasks();
    });
  }

  drop(event, status: string, progStat?: number) {
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
          console.log(event.container.data[event.currentIndex]);
          this.taskService.patchTaskStatus({status}, id).subscribe();
          if (status === 'InProgress') {
            this.taskService.patchProgressStatus(progStat, id).subscribe();
          }
    }
  }

  delTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.getAllTasks());
  }

}
