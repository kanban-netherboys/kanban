import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddUserPopUpComponent } from 'src/app/shared/components/add-user-pop-up/add-user-pop-up.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-core-one',
  templateUrl: './core-one.component.html',
  styleUrls: ['./core-one.component.scss']
})
export class CoreOneComponent implements OnInit {

  // WIPLimit = 3;
  limitWarning = 'Exceeded!';
  nextLimitExceeded = false;
  inProgressLimitExceeded = false;

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

  tasksWithUsers = [];

  constructor(private taskService: TaskService,
              private userService: UserService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.userService.getUsersPerTask().subscribe((res: any) => {
      this.tasksWithUsers = [];
      res.taskWithUserList.forEach(el => {
        this.tasksWithUsers.push({ ...el.userList[0], ...el.kanbanTask });
      });
      // console.log(this.tasksWithUsers);

      this.backlog = this.tasksWithUsers.filter(task => task.status === 'Backlog');
      this.next = this.tasksWithUsers.filter(task => task.status === 'Next');
      this.inProgress = this.tasksWithUsers.filter(task => task.status === 'InProgress');
      this.done = this.tasksWithUsers.filter(task => task.status === 'Done');

      this.inProgress0 = this.tasksWithUsers.filter(task => task.status === 'InProgress' && task.progressStatus === 0);
      this.inProgress1 = this.tasksWithUsers.filter(task => task.status === 'InProgress' && task.progressStatus === 1);
      this.inProgress2 = this.tasksWithUsers.filter(task => task.status === 'InProgress' && task.progressStatus === 2);
      this.inProgress3 = this.tasksWithUsers.filter(task => task.status === 'InProgress' && task.progressStatus === 3);
      this.inProgress4 = this.tasksWithUsers.filter(task => task.status === 'InProgress' && task.progressStatus === 4);
      this.inProgress5 = this.tasksWithUsers.filter(task => task.status === 'InProgress' && task.progressStatus === 5);
      this.calculateWipNext();
      this.calculateWipInProgress();
    });
  }

  addTaskDialog(status: string) {
      const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
        data: { status: status },
        height: '500px',
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getAllTasks();
      });
  }

  editTaskDialog(id: number) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { id: id},
      height: '480px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasks();
    });
  }

  addUserDialog() {
    const dialogRef = this.dialogService.openDialog(AddUserPopUpComponent);
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
          this.taskService.patchTaskStatus({status: status}, id).subscribe(() => {
            this.taskService.patchProgressStatus({progressStatus: progStat}, id).subscribe(() => {
              this.calculateWipNext();
              this.calculateWipInProgress();
            });
          });
    }
  }

  delTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.getAllTasks());
  }

  calculateWipNext() {
    this.nextLimitExceeded = false;
    const array_elements = [];

    this.next.forEach(el => {
      if (el.name !== undefined) {
        array_elements.push(el.name);
      }
    });

    console.log(array_elements);

    array_elements.sort();

    let current = null;
    let  cnt = 0;
    for (let i = 0; i < array_elements.length; i++) {
        if (array_elements[i] !== current) {
            if (cnt > 0) {
                console.log(current + ' comes --> ' + cnt + ' times');
                if (cnt >= 3) {
                  this.nextLimitExceeded = true;
                }
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        console.log(current + ' comes --> ' + cnt + ' timess');
        if (cnt >= 3) {
          this.nextLimitExceeded = true;
        }
    }

  }

  calculateWipInProgress() {
    this.inProgressLimitExceeded = false;
    const array_elements2 = [];
    const arr = [...this.inProgress1, ...this.inProgress2, ...this.inProgress3, ...this.inProgress4, ...this.inProgress5];
    arr.forEach(el => {
      if (el.name !== undefined) {
        array_elements2.push(el.name);
      }
    });

    console.log(array_elements2);

    array_elements2.sort();

    let current = null;
    let  cnt = 0;
    for (let i = 0; i < array_elements2.length; i++) {
        if (array_elements2[i] !== current) {
            if (cnt > 0) {
                console.log(current + ' comes --> ' + cnt + ' times');
                if (cnt >= 6) {
                  this.inProgressLimitExceeded = true;
                }
            }
            current = array_elements2[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        console.log(current + ' comes --> ' + cnt + ' timess');
        if (cnt >= 6) {
          this.inProgressLimitExceeded = true;
        }
    }
  }
}
