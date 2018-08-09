import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Util, UserModel, TaskModel } from '../../shared';

export interface Tasks {
  id: string,
  title: string;
  description: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tasks: Array<TaskModel> = [];
  user: UserModel;
  task: TaskModel;
  currentRole: string;
  dataSource: MatTableDataSource<Tasks>;
  displayedColumns = ['id', 'title', 'description', 'actions']

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ngOnInit() {
    this.loadTasks();
    this.currentRole = this.getUsersRole();
  }

  getUsersRole() {
    this.user = UserModel.Auth();
    return this.user.roles;
  }

  async loadTasks() {
    this.tasks = await TaskModel.getAllTasks();
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async onDelete(id: string) {
    let remove = await Util.openRemoveDialog({ data: { title: 'Warning!', body: 'Are you sure you want to delete this task?' } });
    this.task = await TaskModel.getById(id);
    if (remove) {
      let err, res;
      [err, res] = await Util.to(this.task.removeTask());
      if (err) {
        console.log(err, 'err')
        return;
      }
      this.loadTasks();
      this.snackBar.open('Task', 'Deleted', { duration: 2000 });
      setTimeout(() => { TaskModel.to('tasks'); }, 1000);
    }
  }

}
