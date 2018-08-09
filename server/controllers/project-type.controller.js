const ProjectType = require('../models/project-type.model');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, projectType;
  let projectTypeInfo = req.body;

  [err, projectType] = await to(ProjectType.create(projectTypeInfo));
  if (err) return ReE(res, err, 422);

  return ReS(res, { projectType: projectType.toWeb() }, 201);
};
module.exports.create = create;

// NOTE: MIDDLEWARE GET BY ID FUNCTION THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let projectTypeId, err, projectType;
  let body = req.body;
  projectTypeId = req.params.projectTypeId;

  [err, projectType] = await to(ProjectType.findOne({ _id: projectTypeId }));
  if (err) return ReE(res, "Error finding projectType.");

  if (!projectType) return ReE(res, "ProjectType not found with Id: " + projectTypeId);

  req.projectType = projectType;
  next();
};
module.exports.getById = getById;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let projectType = req.projectType;
  return ReS(res, { projectType: projectType.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let projectType = req.body;
  let err, projectTypes;
  [err, projectTypes] = await to(ProjectType.find({ projectType: projectType.id }))
  if (err) ReE(err, 'err getting projectTypes');

  let projectTypeJson = [];
  for (let i in projectTypes) {
    let projectTypeList = projectTypes[i];
    projectTypeJson.push(projectTypeList.toWeb())
  }
  return ReS(res, { projectTypes: projectTypeJson });
}
module.exports.getAll = getAll;

const update = async function(req, res) {
  let err, projectType, data;
  projectType = req.projectType;
  data = req.body;
  projectType.set(data);

  [err, projectType] = await to(projectType.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { projectType: projectType.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
  let projectType, err;
  projectType = req.projectType;

  [err, projectType] = await to(projectType.remove());
  if (err) return ReE(res, 'error occured trying to delete the projectType');

  return ReS(res, { message: 'Deleted Project Type' }, 204);
}
module.exports.remove = remove;
