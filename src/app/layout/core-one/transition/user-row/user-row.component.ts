import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddUserPopUpComponent } from 'src/app/shared/components/add-user-pop-up/add-user-pop-up.component';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {

  @Input() user;
  @Output() del = new EventEmitter();

  WIPLimit = 3;
  limitWarning = 'Exceeded!';

  tasks: Task[];
  backlog = [];
  next = [];
  inProgress = [];
  done = [];

  users: User[];

  constructor(private taskService: TaskService,
              private dialogService: DialogService,
              private userService: UserService) { }

  ngOnInit() {
    this.allTasksPerUser();
    this.getAllUsers();
  }

  allTasksPerUser() {
    console.log(this.user.kanbanTaskList.filter(el => el));

    this.user.kanbanTaskList.forEach(el => {
      if (el.status === 'Backlog') {
        this.backlog.push(el);
      }
      if (el.status === 'Next') {
        this.next.push(el);
      }
      if (el.status === 'InProgress') {
        this.inProgress.push(el);
      }
      if (el.status === 'Done') {
        this.done.push(el);
      }
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
      this.users = res.userList;
    });
  }

  editTaskDialog(id: number) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { id: id},
      height: '430px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // this.allTasksPerUser();
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

  delTask(id: number) {
    // this.taskService.deleteTask(id).subscribe(() => this.allTasksPerUser());
    this.del.emit(id);
  }

}
