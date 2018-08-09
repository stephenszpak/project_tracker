import { Model } from 'browser-model';

import { API } from '../helpers/api.helper';
import { Util } from '../helpers/util.helper';

export class TaskModel extends Model {
  apiUpdateValues: Array<string> = ['title', 'description'];

  id;
  title;
  description;

  static SCHEMA = {
    id: { type: 'string', primary: true },
    title: { type: 'string' },
    description: { type: 'string' }
  };

  constructor(obj: object) {
    super(obj);
  }

  to(action) {
    return Util.route('/tasks/' + action + '/' + this.id);
  }

  async saveAPI(info: any) {
    return API.save(this, '/api/tasks/' + this.id, info);
  }

  async removeTask() {
    return API.remove(this, '/api/tasks/' + this.id);
  }

  static to(action) {
    return Util.route(action);
  }

  static async getAllTasks() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/tasks'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let tasks = []
    for (let i in res.tasks) {
      let taskInfo = res.tasks[i];
      let task = this.resCreate(taskInfo);
      tasks.push(task);
    }
    console.log('tasks in model: ', tasks)
    return tasks;
  }

  static async getAPI() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/tasks'))
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let task
  }

  static resCreate(resTask) {//create task instance from a task response
    let task = this.findById(resTask.id);
    if (task) return task;
    let taskInfo = resTask;
    taskInfo.id = resTask.id;

    task = this.create(taskInfo);
    return task;
  }

  static async UpdateTask(taskInfo: any, id: string) {
    let err, res;
    [err, res] = await Util.to(Util.put('/api/tasks/' + id, taskInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let task = this.resCreate(res.task);
    console.log('update task', task)
    task.emit(['updated'], taskInfo, true);
    return task;
  }

  static async CreateAPI(taskInfo: any) {
    let err, res;
    [err, res] = await Util.to(Util.post('/api/tasks', taskInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let task = this.resCreate(res.task);
    console.log('created task', task)
    task.emit(['newly-created'], taskInfo, true);
    return task;
  }

  static async getById(id: string) {
    let task = this.findById(id);
    if (task) return task;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/tasks/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let taskInfo = res.task;
    task = this.resCreate(res.task);
    console.log('get by id task: ', task)
    return task;
  }
}
