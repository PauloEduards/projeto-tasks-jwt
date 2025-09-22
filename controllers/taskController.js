const Task = require('../models/Task');
const User = require('../models/User');

const renderTasksPage = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      include: User,
    });
    res.render('tasks', { tasks });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
}

const renderNewTaskPage = (req, res) => {
  res.render('new-task');
}

const renderEditTaskPage = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.render('edit-task', { task });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch task' });
  }
}

const create = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user_id: req.user.id });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Failed to create task' });
  }
};

const list = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      include: User,
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
};

const update = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.update(
      { title, description },
      { where: { id: req.params.id, user_id: req.user.id } }
    );
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Failed to update task' });
  }
};

const complete = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (task) {
      await task.update({ completed: !task.completed });
    }
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Failed to update task' });
  }
};

const deleteById = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
};

module.exports = {
  renderTasksPage,
  renderNewTaskPage,
  renderEditTaskPage,
  create,
  list,
  update,
  complete,
  deleteById
};