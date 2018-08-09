import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, TaskModel } from "../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../shared/errors';

export interface TaskInfo {
  id: string,
  title: string,
  description: string
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html'
})
export class CreateTaskComponent implements OnInit {
  taskInfo: TaskInfo = <TaskInfo>{};
  taskForm: FormGroup;
  loading: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  async onSubmit() {
    this.taskInfo = this.prepareForm();

    let err, task;
    [err, task] = await Util.to(TaskModel.CreateAPI(this.taskInfo));
    if (!err) this.snackBar.open('Task Created', '', { duration: 2000, panelClass: ['sb-success'] });

    setTimeout(() => { TaskModel.to('tasks') }, 2000);

  }

  prepareForm(): TaskInfo {
    const formValues = this.taskForm.value;
    const saveForm: any = {
      title: formValues.title,
      description: formValues.description
    }
    return saveForm;
  }

  matcher = new FormControlErrors();
}
