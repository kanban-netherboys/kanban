import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

constructor(private http: HttpClient) { }

  addTask(taskData: Task) {
    return this.http.post(environment.apiUrl + 'KanbanTask', taskData, { responseType: 'text' });
  }

  addTaskToUser(taskData) {
    return this.http.post(environment.apiUrl + 'User/AddTaskToUser', taskData, { responseType: 'text' });
  }

  deleteTask(id: number) {
    return this.http.delete(environment.apiUrl + 'KanbanTask?kanbanTaskId=' + id, { responseType: 'text' });
  }

  getAllTasks() {
    return this.http.get(environment.apiUrl + 'KanbanTask/AllTasks');
  }

  allTasksPerUser() {
    return this.http.get(environment.apiUrl + 'User/AllTasksPerUser');
  }

  getSingleTask(id: number) {
    return this.http.get(environment.apiUrl + 'KanbanTask/BySingleTask?kanbanTaskId=' + id);
  }

  patchTask(taskData: Task, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchTask?kanbanTaskId=' + id, taskData, { responseType: 'text' });
  }

  patchTaskStatus(taskData: Task, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchStatus?kanbanTaskId=' + id, taskData, { responseType: 'text' });
  }

}
