const Task = require('../models/Task');
const dateFormat = require("dateformat");


module.exports = {

    newTask: (req, res) => {
        res.render('tasks/new')
    },

    createTask: async (req, res) => {
        const userCreated = req.body.userCreated,
              taskName = req.body.taskName,
              description = req.body.description,
              dueDate = req.body.dueDate,
              timeComplete = req.body.timeComplete,
              actionType = req.body.actionType

        const newTask = new Task({
            userCreated,
            taskName,
            description,
            dueDate,
            timeComplete,
            actionType
        });

        Task.create(newTask);
        console.log(newTask);
        res.redirect('/');
    },

    getAllTasks: (req, res, next) => {
        Task.find({ userCreated: req.user.email })
        .then(tasks => {
            res.locals.tasks = tasks;
            res.render('dashboard', {dateFormat: dateFormat})
        })
        .catch(error => {
            console.log('cant get that')
            next(error);
        })
    },

    getToDo: (req, res, next) => {
        Task.find({ userCreated: req.user.email })
        .then(tasks => {
            res.locals.tasks = tasks;
            res.render('tasks/todo', {dateFormat: dateFormat})
        })
        .catch(error => {
            console.log('cant get that')
            next(error);
        })
    },

    getDoing: (req, res, next) => {
        Task.find({ userCreated: req.user.email })
        .then(tasks => {
            res.locals.tasks = tasks;
            res.render('tasks/doing', {dateFormat: dateFormat})
        })
        .catch(error => {
            console.log('cant get that')
            next(error);
        })
    },

    getDone: (req, res, next) => {
        Task.find({ userCreated: req.user.email })
        .then(tasks => {
            res.locals.tasks = tasks;
            res.render('tasks/done', {dateFormat: dateFormat})
        })
        .catch(error => {
            console.log('cant get that')
            next(error);
        })
    },

    getTask: async(req, res, next) => {
        let id = req.params.id;
        try {
            let task = await Task.findById(id);
            res.locals.task = task;
            console.log(task);
            res.render('tasks/single-task')
        } catch (error) {
            res.redirect('/');
            console.log(error);
        }
    },

    deleteTask: (req, res, next) => {
        let id = req.params.id;
        Task.deleteOne({ _id: id})
            .then((thing) => {
                res.redirect('/');
                next();
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/');
                next();
            });
    },

    updateTask: async (req, res, next) => {
        let id = req.params.id;
        const userCreated = req.body.userCreated,
              taskName = req.body.taskName,
              description = req.body.description,
              dueDate = req.body.dueDate,
              timeComplete = req.body.timeComplete,
              actionType = req.body.actionType;

        const updateTask = {
            userCreated,
            taskName,
            description,
            dueDate,
            timeComplete,
            actionType
        }

        try {
            let task = await Task.findByIdAndUpdate(id, updateTask).then();
            res.redirect('/');
            next();
        } catch (error) {
            console.log(error);
            res.redirect('/');
        }
    }

}