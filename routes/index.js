const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const homeController = require('../controllers/homeController');
const taskController = require('../controllers/taskController');


// App Landing
router.get('/', forwardAuthenticated, homeController.getIndex);

// Dashboard
router.get('/dashboard', ensureAuthenticated, taskController.getAllTasks);
router.get('/dashboard/todo', ensureAuthenticated, taskController.getToDo);
router.get('/dashboard/doing', ensureAuthenticated, taskController.getDoing);
router.get('/dashboard/done', ensureAuthenticated, taskController.getDone);

// Task Actions
router.get('/dashboard/new', ensureAuthenticated, taskController.newTask);
router.post('/dashboard/create', ensureAuthenticated, taskController.createTask);
router.get('/dashboard/task/:id', ensureAuthenticated, taskController.getTask);
router.get('/dashboard/task/:id/delete', ensureAuthenticated, taskController.deleteTask);
router.post('/dashboard/task/:id/update', ensureAuthenticated, taskController.updateTask);


module.exports = router;
