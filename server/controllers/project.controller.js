const { Project } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');


const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, project, notify;
  let projectInfo = req.body;

  [err, project] = await to(Project.create(projectInfo));
  if (err) return ReE(res, err, 422);

  return ReS(res, { project: project.toWeb(), notify: project.notifyIfLessThan500() }, 201);
};
module.exports.create = create;

// NOTE: MIDDLEWARE GET BY ID FUNCTION THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let projectId, err, project;
  let body = req.body;
  projectId = req.params.projectId;

  [err, project] = await to(Project.findOne({ _id: projectId }));
  if (err) return ReE(res, "Error finding project.");

  if (!project) return ReE(res, "Project not found with Id: " + projectId);

  req.project = project;
  next();
};
module.exports.getById = getById;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let project = req.project;
  return ReS(res, { project: project.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let project = req.body;
  let err, projects;
  [err, projects] = await to(Project.find({ project: project.id }))
  if (err) ReE(err, 'err getting projects');

  let projectJson = [];
  for (let i in projects) {
    let projectList = projects[i];
    projectJson.push(projectList.toWeb())
  }
  return ReS(res, { projects: projectJson });
}
module.exports.getAll = getAll;

const update = async function(req, res) {
  let err, project, data;
  project = req.project;
  data = req.body;
  project.set(data);

  [err, project] = await to(project.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { project: project.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
  let project, err;
  project = req.project;

  [err, project] = await to(project.remove());
  if (err) return ReE(res, 'error occured trying to delete the project');

  return ReS(res, { message: 'Deleted Project' }, 204);
}
module.exports.remove = remove;
