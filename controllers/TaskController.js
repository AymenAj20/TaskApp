const Task = require('../models/Task');

// Renvoie les Tasks d'un User
exports.getUserTasks = async function (req, res) {
  const userId = req.params.userID; // Récupérer l'ID de l'utilisateur

  try {
    const userTasks = await Task.find({ user: userId });
    res.status(200).json(userTasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches de l\'utilisateur' });
  }
};

// Renvoie toutes les Tasks
exports.getAllTasks = async function (req, res) {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les tâches :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de toutes les tâches' });
  }
};

// Ajouter une Tache a un utilisateur
exports.addTaskToUser = async function (req, res) {
  const userId = req.params.userID; // Récupérer l'ID de l'utilisateur
  const { title,description,state,domaine,deadline,urgence } = req.body; // Récupérer les données de la tâche à ajouter

  try {
    const newTask = new Task({
      user: userId,
      title: title ,
      description:description,
      state:state,
      domaine:domaine,
      urgence:urgence,
      deadline:deadline
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche à l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche à l\'utilisateur' });
  }
};


exports.getTaskById = async function (req, res) {
  const taskId = req.params.taskID;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche par ID :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche par ID' });
  }
};

// Modifier une Task par ID
exports.updateTaskById = async function (req, res) {
  const taskId = req.params.taskID;
  const { title, description, state, domaine, deadline } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, state, domaine, deadline },
      { new: true } // Return the modified document rather than the original
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erreur lors de la modification de la tâche par ID :', error);
    res.status(500).json({ message: 'Erreur lors de la modification de la tâche par ID' });
  }
};

// Supprimer une Task par ID
exports.deleteTaskById = async function (req, res) {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche par ID :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche par ID' });
  }
};
