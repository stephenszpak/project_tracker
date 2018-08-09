const { Task } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, task;
  let taskInfo = req.body;

  [err, task] = await to(Task.create(taskInfo));
  if (err) return ReE(res, err, 422);

  return ReS(res, { task: task.toWeb() }, 201);
};
module.exports.create = create;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let task = req.task;
  return ReS(res, { task: task.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let task = req.body;
  let err, tasks;
  [err, tasks] = await to(Task.find({ task: task.id }))
  if (err) ReE(err, 'err getting tasks');

  let taskJson = [];
  for (let i in tasks) {
    let taskList = tasks[i];
    taskJson.push(taskList.toWeb())
  }
  return ReS(res, { tasks: taskJson });
}
module.exports.getAll = getAll;

const update = async function(req, res) {
  let err, task, data;
  task = req.task;
  data = req.body;
  task.set(data);

  [err, task] = await to(task.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { task: task.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
  let task, err;
  task = req.task;

  [err, task] = await to(task.remove());
  if (err) return ReE(res, 'error occured trying to delete the task');

  return ReS(res, { message: 'Deleted Task' }, 204);
}
module.exports.remove = remove;


// NOTE: GET BY ID THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let taskId, err, task;
  let body = req.body;
  taskId = req.params.taskId;

  [err, task] = await to(Task.findOne({ _id: taskId }));
  if (err) return ReE(res, "Error finding task.");

  if (!task) return ReE(res, "Task not found with Id: " + taskId);

  req.task = task;
  next();
};
module.exports.getById = getById;
