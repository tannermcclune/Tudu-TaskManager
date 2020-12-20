module.exports = {

    getIndex: (req, res) => {
        res.render('landing');
    },

    getDashboard: (req, res) => {
        res.render('dashboard', {
            user: req.user
          })
    },

    getTodo: (req, res) => {
        res.render('tasks/todo', {
            user: req.user
          })
    },

    getDoing: (req, res) => {
        res.render('tasks/doing', {
            user: req.user
          })
    },

    getDone: (req, res) => {
        res.render('tasks/done', {
            user: req.user
          })
    }

}