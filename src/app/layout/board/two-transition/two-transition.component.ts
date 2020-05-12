import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AddUserPopUpComponent } from 'src/app/shared/components/add-user-pop-up/add-user-pop-up.component';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';

@Component({
  selector: 'app-two-transition',
  templateUrl: './two-transition.component.html',
  styleUrls: ['./two-transition.component.scss']
})
export class TwoTransitionComponent implements OnInit {

  WIPLimit = 3;
  limitWarning = 'Exceeded!';

  tasks: Task[];
  backlog = [];
  next = [];
  inProgress = [];
  done = [];

  usersAndTasks;
  rowsAndTasks;

  constructor(private taskService: TaskService,
              private dialogService: DialogService,
              private userService: UserService) { }

  ngOnInit() {
    this.getAllTasksWithRows();
  }

  getAllTasksWithRows() {
    this.taskService.getAllTasksWithRows().subscribe((res: any) => {
      this.rowsAndTasks = res.tasksList;
    });
  }

  addUserDialog() {
    const dialogRef = this.dialogService.openDialog(AddUserPopUpComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasksWithRows();
    });
  }

  addTaskDialog(status: string) {
    const dialogRef = this.dialogService.openDialog(AddTaskPopUpComponent, {
      data: { status: status },
      height: '685px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasksWithRows();
    });
  }

  delTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getAllTasksWithRows();
    });
  }

  reloadTasks() {
    this.getAllTasksWithRows();
  }

}
