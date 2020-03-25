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

  users: User[];

  constructor(private taskService: TaskService,
              private dialogService: DialogService,
              private userService: UserService) { }

  ngOnInit() {
    this.getAllTasks();
    this.getAllUsers();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((res: {kanbanList: Task[]}) => {
      this.tasks = res.kanbanList;
      this.backlog = res.kanbanList.filter(task => task.status === 'Backlog');
      this.next = res.kanbanList.filter(task => task.status === 'Next');
      this.inProgress = res.kanbanList.filter(task => task.status === 'InProgress');
      this.done = res.kanbanList.filter(task => task.status === 'Done');
      console.log(this.tasks);
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
      this.users = res.userList;
      console.log(this.users);
    });
  }

  addUserDialog() {
    const dialogRef = this.dialogService.openDialog(AddUserPopUpComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllUsers();
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
    this.taskService.deleteTask(id).subscribe(() => this.getAllTasks());
  }

}
