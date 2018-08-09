import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, TaskModel } from '../../../shared';
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../shared/errors';

export interface TaskInfo {
  id: string,
  title: string,
  description: string
}

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html'
})
export class UpdateTaskComponent implements OnInit {
  taskInfo: TaskInfo
  url_params;
  taskForm: FormGroup;
  task: any = { title: '', description: '' };

  constructor(
    private aRoute: ActivatedRoute,
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

  async ngOnInit() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.task = await TaskModel.findById(this.url_params.id)

    //populate form
    this.taskForm = this.fb.group({
      title: this.task.title,
      description: this.task.description
    });
  }

  async onSubmit() {
    this.taskInfo = this.prepareForm();
    console.log('prepared form', this.taskInfo)

    let err, res;
    [err, res] = await Util.to(this.task.saveAPI());
    if (err) {
      if (err.message == 'Nothing Updated') this.snackBar.open('Task', 'Nothing to Update', { duration: 2000 });
      return;
    }
    this.snackBar.open('Task Updated', '', { duration: 2000, panelClass: ['sb-success'] });
    setTimeout(() => { TaskModel.to('tasks'); }, 2000);
  }

  prepareForm(): TaskInfo {
    const formValues = this.taskForm.value;
    const saveForm: any = {
      id: this.aRoute.snapshot.params['id'],
      title: formValues.title,
      description: formValues.description
    }
    return saveForm;
  }

  matcher = new FormControlErrors();
}
