import { Schema, model, models } from 'mongoose'

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
})

export default models.Task || model('Task', taskSchema)