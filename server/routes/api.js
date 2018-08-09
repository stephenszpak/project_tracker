const express = require('express');
const router = express.Router();

const Notify = require('../config/notifications');

const UserController = require('../controllers/user.controller');
const TaskController = require('../controllers/task.controller');
const HomeController = require('../controllers/home.controller');
const ProjectController = require('../controllers/project.controller');
const AudienceController = require('../controllers/audience.controller');
const PlatformController = require('../controllers/platform.controller');
const LocationController = require('../controllers/location.controller');
const ProjectTypeController = require('../controllers/project-type.controller');

const passport = require('passport');
const path = require('path');

require('../middlewares/passport')(passport);

router.get('/', function(req, res, next) {
  res.json({ status: "success", message: "Project Tracker API", data: { "version_number": "v0.0.2" } })
});

// auth
router.post('/users/register', UserController.create);
router.post('/users/login', UserController.login);
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getAll);
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), UserController.getById, UserController.get);

// tasks
router.post('/tasks', passport.authenticate('jwt', { session: false }), TaskController.create);
router.get('/tasks', passport.authenticate('jwt', { session: false }), TaskController.getAll);
router.get('/tasks/:taskId', passport.authenticate('jwt', { session: false }), TaskController.getById, TaskController.get);
router.put('/tasks/:taskId', passport.authenticate('jwt', { session: false }), TaskController.getById, TaskController.update);
router.delete('/tasks/:taskId', passport.authenticate('jwt', { session: false }), TaskController.getById, TaskController.remove);

// projects
router.post('/projects', passport.authenticate('jwt', { session: false }), ProjectController.create);
router.get('/projects', passport.authenticate('jwt', { session: false }), ProjectController.getAll);
router.get('/projects/:projectId', passport.authenticate('jwt', { session: false }), ProjectController.getById, ProjectController.get);
router.put('/projects/:projectId', passport.authenticate('jwt', { session: false }), ProjectController.getById, ProjectController.update);
router.delete('/projects/:projectId', passport.authenticate('jwt', { session: false }), ProjectController.getById, ProjectController.remove);

// audiences
router.post('/audiences', passport.authenticate('jwt', { session: false }), AudienceController.create);
router.get('/audiences', passport.authenticate('jwt', { session: false }), AudienceController.getAll);
router.get('/audiences/:audienceId', passport.authenticate('jwt', { session: false }), AudienceController.getById, AudienceController.get);
router.put('/audiences/:audienceId', passport.authenticate('jwt', { session: false }), AudienceController.getById, AudienceController.update);
router.delete('/audiences/:audienceId', passport.authenticate('jwt', { session: false }), AudienceController.getById, AudienceController.remove);

// project types
router.post('/types', passport.authenticate('jwt', { session: false }), ProjectTypeController.create);
router.get('/types', passport.authenticate('jwt', { session: false }), ProjectTypeController.getAll);
router.get('/types/:projectTypeId', passport.authenticate('jwt', { session: false }), ProjectTypeController.getById, ProjectTypeController.get);
router.put('/types/:projectTypeId', passport.authenticate('jwt', { session: false }), ProjectTypeController.getById, ProjectTypeController.update);
router.delete('/types/:projectTypeId', passport.authenticate('jwt', { session: false }), ProjectTypeController.getById, ProjectTypeController.remove);

// platforms
router.post('/platforms', passport.authenticate('jwt', { session: false }), PlatformController.create);
router.get('/platforms', passport.authenticate('jwt', { session: false }), PlatformController.getAll);
router.get('/platforms/:platformId', passport.authenticate('jwt', { session: false }), PlatformController.getById, PlatformController.get);
router.put('/platforms/:platformId', passport.authenticate('jwt', { session: false }), PlatformController.getById, PlatformController.update);
router.delete('/platforms/:platformId', passport.authenticate('jwt', { session: false }), PlatformController.getById, PlatformController.remove);

// locations
router.post('/locations', passport.authenticate('jwt', { session: false }), LocationController.create);
router.get('/locations', passport.authenticate('jwt', { session: false }), LocationController.getAll);
router.get('/locations/:locationId', passport.authenticate('jwt', { session: false }), LocationController.getById, LocationController.get);
router.put('/locations/:locationId', passport.authenticate('jwt', { session: false }), LocationController.getById, LocationController.update);
router.delete('/locations/:locationId', passport.authenticate('jwt', { session: false }), LocationController.getById, LocationController.remove);


// home page -- not used atm (7/20/18)
router.get('/dash', passport.authenticate('jwt', { session: false }), HomeController.Dashboard)

module.exports = router;
