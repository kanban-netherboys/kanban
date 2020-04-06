import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddUserPopUpComponent } from 'src/app/shared/components/add-user-pop-up/add-user-pop-up.component';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss']
})
export class TransitionComponent implements OnInit {

  WIPLimit = 3;
  limitWarning = 'Exceeded!';

  tasks: Task[];
  backlog = [];
  next = [];
  inProgress = [];
  done = [];

  users;

  constructor(private taskService: TaskService,
              private dialogService: DialogService,
              private userService: UserService) { }

  ngOnInit() {
    this.getAllTasks();
    // this.getAllUsers();
  }

  getAllTasks() {
    this.taskService.allTasksPerUser().subscribe((res: any) => {
    //   this.tasks = res.kanbanList;
    //   this.backlog = res.kanbanList.filter(task => task.status === 'Backlog');
    //   this.next = res.kanbanList.filter(task => task.status === 'Next');
    //   this.inProgress = res.kanbanList.filter(task => task.status === 'InProgress');
    //   this.done = res.kanbanList.filter(task => task.status === 'Done');
    //   console.log(this.tasks);
    this.users = res.usersTasksList;
    console.log(res);
    // console.log(res);
    });
  }

  // allTasksPerUser() {
  //   console.log(this.user);
  //   this.taskService.allTasksPerUser().subscribe((res: any) => {
  //     console.log(res.usersTasksList);
  //     res.usersTasksList.filter(el => {
  //       if (el.user.id === this.user.id) {
  //         this.backlog = el.kanbanTaskList.filter(task => task.status === 'Backlog');
  //         this.next = el.kanbanTaskList.filter(task => task.status === 'Next');
  //         this.inProgress = el.kanbanTaskList.filter(task => task.status === 'InProgress');
  //         this.done = el.kanbanTaskList.filter(task => task.status === 'Done');
  //       }
  //     });
  //     console.log(this.backlog);
  //   });
  // }

  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
  //     this.users = res.userList;
  //   });
  // }

  addUserDialog() {
    const dialogRef = this.dialogService.openDialog(AddUserPopUpComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasks();
    });
  }

  addTaskDialog(status: string) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { status: status },
      height: '492px',
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

  delTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.getAllTasks());
  }

}
