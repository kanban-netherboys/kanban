import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-two-user-row',
  templateUrl: './two-user-row.component.html',
  styleUrls: ['./two-user-row.component.scss']
})
export class TwoUserRowComponent implements OnInit {

  @Input() rowAndTasks;
  @Output() del = new EventEmitter();
  @Output() edit = new EventEmitter();

  // WIPLimit = 3;
  limitWarning = 'Exceeded!';

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

  users: User[];

  colors = {
    yellow: '#ffff8e',
    green: '#97f197',
    red: '#ff7272',
    blue: '#8787f5'
  };

  whoExceeded = [];
  whoExceeded2 = [];

  constructor(private taskService: TaskService,
              private dialogService: DialogService,
              private userService: UserService) { }

  ngOnInit() {
    this.allTasksPerUser();
    this.getAllUsers();
  }

  allTasksPerUser() {
    const wholeTask = this.rowAndTasks.kanbanTasksList;

    this.backlog = wholeTask.filter(task => task.status === 'Backlog');
    this.next = wholeTask.filter(task => task.status === 'Next');
    this.inProgress = wholeTask.filter(task => task.status === 'InProgress');
    this.done = wholeTask.filter(task => task.status === 'Done');

    this.inProgress0 = wholeTask.filter(task => task.status === 'InProgress' && task.progressStatus === 0);
    this.inProgress1 = wholeTask.filter(task => task.status === 'InProgress' && task.progressStatus === 1);
    this.inProgress2 = wholeTask.filter(task => task.status === 'InProgress' && task.progressStatus === 2);
    this.inProgress3 = wholeTask.filter(task => task.status === 'InProgress' && task.progressStatus === 3);
    this.inProgress4 = wholeTask.filter(task => task.status === 'InProgress' && task.progressStatus === 4);
    this.inProgress5 = wholeTask.filter(task => task.status === 'InProgress' && task.progressStatus === 5);

    this.calculateWipNext();
    this.calculateWipInProgress();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
      this.users = res.userList;
    });
  }

  editTaskDialog(id: number) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { id: id },
      height: '685px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.allTasksPerUser();
      this.edit.emit();
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
          const users = event.container.data[event.currentIndex].userList;
          console.log(users);
          // this.checkForVip(event.container.data, users);
          this.taskService.patchTaskStatus({status: status}, id).subscribe(() => {
            this.taskService.patchProgressStatus({progressStatus: progStat}, id).subscribe(() => {
              this.calculateWipNext();
              this.calculateWipInProgress();
            });
          });
    }
  }

  delTask(id: number) {
    this.del.emit(id);
  }

  setBackgroundColor(color) {
    if (color === 'yellow') {
      return '#FFF7DE';
    } else if (color === 'green') {
      return '#DBF5D4';
    } else if (color === 'red') {
      return '#FFE5EB';
    } else if (color === 'blue') {
      return '#DBEEFF';
    } else {
      return '#ffffff';
    }
  }

  setBorderBottomColor(color) {
    if (color === 'yellow') {
      return '4px solid #ffe488';
    } else if (color === 'green') {
      return '4px solid #a1f18a';
    } else if (color === 'red') {
      return '4px solid #ffa2b9';
    } else if (color === 'blue') {
      return '4px solid #8ecaff';
    } else {
      return '4px solid #dedede';
    }
  }

  setOwnerIconColor(color) {
    if (color === 'yellow') {
      return '#ffe488';
    } else if (color === 'green') {
      return '#a1f18a';
    } else if (color === 'red') {
      return '#ffa2b9';
    } else if (color === 'blue') {
      return '#8ecaff';
    } else {
      return '#dedede';
    }
  }

  // checkForVip(data, currentUsers) {
  //   const users = [];
  //   data.forEach(el => {
  //     if (el.userList.length !== 0) {
  //       el.userList.forEach((e) => {
  //         users.push({name: e.name, id: el.id});
  //       });
  //     }
  //   });
  //   users.filter(el => {
  //     if (el.name === ) {
  //       -1 oskar
  //     }
  //   });
  //   console.log(users);
  //   console.log(currentUsers);
  // }

  isExceeded(userList) {
    let isExceeded = false;
    userList.forEach(user => {
      if (this.whoExceeded.includes(user.name)) {
        isExceeded = true;
      }
    });
    return isExceeded;
  }

  isExceeded2(userList) {
    let isExceeded = false;
    userList.forEach(user => {
      if (this.whoExceeded2.includes(user.name)) {
        isExceeded = true;
      }
    });
    return isExceeded;
  }

  calculateWipNext() {
    this.whoExceeded = [];
    const array_elements = [];


    this.next.forEach(el => {
      if (el.userList.length !== 0) {
        el.userList.forEach(x => {
          array_elements.push(x.name);
        });
      }
    });

    array_elements.sort();
    let current = null;
    let  cnt = 0;
    for (let i = 0; i < array_elements.length; i++) {
        if (array_elements[i] !== current) {
            if (cnt > 0) {
                // console.log(current + ' comes --> ' + cnt + ' times');
                if (cnt >= 3) {
                  this.whoExceeded.push(current);
                }
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        // console.log(current + ' comes --> ' + cnt + ' timess');
        if (cnt >= 3) {
          this.whoExceeded.push(current);
        }
    }
    console.log(this.whoExceeded);

  }

  calculateWipInProgress() {
    this.whoExceeded2 = [];
    const array_elements = [];
    const arr = [...this.inProgress1, ...this.inProgress2, ...this.inProgress3, ...this.inProgress4, ...this.inProgress5];
    arr.forEach(el => {
      if (el.userList.length !== 0) {
        el.userList.forEach(x => {
          array_elements.push(x.name);
        });
      }
    });

    array_elements.sort();

    let current = null;
    let  cnt = 0;
    for (let i = 0; i < array_elements.length; i++) {
        if (array_elements[i] !== current) {
            if (cnt > 0) {
                // console.log(current + ' comes --> ' + cnt + ' times');
                if (cnt >= 6) {
                  this.whoExceeded2.push(current);
                }
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        // console.log(current + ' comes --> ' + cnt + ' timess');
        if (cnt >= 6) {
          this.whoExceeded2.push(current);
        }
    }

    console.log(this.whoExceeded2);

  }

}
