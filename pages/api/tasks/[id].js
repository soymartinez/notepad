import Task from "lib/task"
import { dbConnect } from "lib/db"

dbConnect()

export default async function TaskID(req, res) {
    const { method, query: { id } } = req

    switch (method) {
        case 'GET':
            try {
                const tasks = await Task.findById(id)
                if (!tasks) return res.status(404).json({ error: "Task not found" })
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case 'DELETE':
            try {
                const tasks = await Task.findByIdAndDelete(id)
                if (!tasks) return res.status(404).json({ error: "Task not found" })
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case 'PUT':
            try {
                const tasks = await Task.findByIdAndUpdate(id, req.body, { new: true })
                if (!tasks) return res.status(404).json({ error: "Task not found" })
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ error: "Method not allowed" })
    }
}