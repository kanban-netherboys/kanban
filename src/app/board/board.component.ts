import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AddUserPopUpComponent } from 'src/app/shared/components/add-user-pop-up/add-user-pop-up.component';
import { AddTaskPopUpComponent } from 'src/app/shared/components/add-task-pop-up/add-task-pop-up.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  backlog = [];
  next = [];
  inProgress = [];
  done = [];

  rowsAndTasks;

  constructor(private taskService: TaskService,
              private dialogService: DialogService) { }

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
