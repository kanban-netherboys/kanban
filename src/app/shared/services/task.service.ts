import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

constructor(private http: HttpClient) { }
  addTaskWithUser(taskData) {
    return this.http.post(environment.apiUrl + 'User/AddTaskWithUser', taskData, { responseType: 'text' });
  }

  patchTaskStatus(status, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchTaskStatus?kanbanTaskId=' + id, status, { responseType: 'text' });
  }

  patchTaskProgressStatus(status, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchTaskProgressStatus?kanbanTaskId=' + id, status, {responseType: 'text'});
  }

  patchTaskWithUser(task) {
    return this.http.patch(environment.apiUrl + 'User/PatchTaskWithUser', task, { responseType: 'text' });
  }

  getSingleTask(id: number) {
    return this.http.get(environment.apiUrl + 'KanbanTask/GetSingleTask?kanbanTaskId=' + id);
  }

  getTasksByPriority() {
    return this.http.get(environment.apiUrl + 'KanbanTask/GetTasksByPriority');
  }

  deleteTask(id: number) {
    return this.http.delete(environment.apiUrl + 'KanbanTask/DeleteTask?kanbanTaskId=' + id, { responseType: 'text' });
  }
}

