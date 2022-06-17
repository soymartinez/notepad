import { dbConnect } from 'lib/db'
import Task from 'lib/task'

dbConnect()

export default async function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
      }
      catch (err) {
        res.status(500).json({ message: err.message })
      }
      break
    case 'POST':
      try {
        const task = new Task(body)
        task.save()
        res.status(201).json(task)
      }
      catch (err) {
        res.status(500).json({ message: err.message })
      }
      break
    case 'PUT':
      try {
        const task = await Task.findByIdAndUpdate(body._id, body, { new: true })
        res.status(200).json(task)
      }
      catch (err) {
        res.status(500).json({ message: err.message })
      }
      break
    case 'DELETE':
      try {
        const task = await Task.findByIdAndDelete(body._id)
        res.status(200).json(task)
      }
      catch (err) {
        res.status(500).json({ message: err.message })
      }
      break
    default:
      res.status(405).json({
        message: 'Method not allowed'
      })
      break
  }
}