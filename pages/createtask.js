import Layout from 'components/layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Createtask() {
    const { push, query } = useRouter()
    const [task, setTask] = useState({
        title: '',
        description: '',
    })

    const validateForm = () => {
        const { title, description } = task
        const isValid = title.length && description.length
        return isValid
    }

    const createTask = async () => {
        const { title, description } = task;
        const response = await fetch('https://notepad.vercel.app/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                completed: false,
            }),
        })
        if (response.ok) {
            push('/')
        }
    }

    const updateTask = async () => {
        const response = await fetch(`https://notepad.vercel.app/api/tasks/${query.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
        if (response.ok) {
            push('/')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) { return console.log('Form is not valid') }
        if (query.id) { updateTask() } else { createTask() }
        console.log('enviando')
    }

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        })
    }

    const getTask = async (id) => {
        const response = await fetch(`https://notepad.vercel.app/api/tasks/${id}`)
        const data = await response.json()
        console.log(data)
        setTask({
            title: data.title,
            description: data.description,
        })
    }

    useEffect(() => {
        if (query.id) {
            getTask(query.id)
        }
    }, []);

    return (
        <Layout title={'Create Task'}>
            {
                !task.title || !task.description ?
                    <div className=' text-sm text-end font-semibold text-red-400'>* Los campos son obligatorios</div>
                    : null
            }
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                        <label className='uppercase tracking-wide text-gray-400 text-xs font-bold mb-2'>
                            Title
                        </label>
                        <input
                            className='w-full py-2 px-4 mb-3 leading-tight text-sm
                                text-violet-700 border border-gray-200 rounded-full
                                hover:outline-violet-400 outline-1 focus:outline-violet-400'
                            type='text'
                            name='title'
                            placeholder='sleep'
                            value={task.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full px-3'>
                        <label className='uppercase tracking-wide text-gray-400 text-xs font-bold mb-2'>
                            Description
                        </label>
                        <input
                            className='w-full py-2 px-4 mb-3 leading-tight text-sm
                                text-violet-700 border border-gray-200 rounded-full
                                hover:outline-violet-400 outline-1 focus:outline-violet-400'
                            type='text'
                            name='description'
                            placeholder='all day'
                            value={task.description}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </div>
                    {
                        query.id && (
                            <div className='w-full px-3'>
                                <label className='uppercase tracking-wide text-gray-400 text-xs font-bold mb-2'>
                                    Completed
                                </label>
                                <input
                                    className='w-full py-2 px-4 mb-3 leading-tight text-sm
                                text-violet-700 border border-gray-200 rounded-full
                                hover:outline-violet-400 outline-1 focus:outline-violet-400'
                                    type='radio'
                                    name='completed'
                                    placeholder='all day'
                                    value={task.completed}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                        )
                    }
                    <div className='w-full px-3'>
                        <button
                            className='w-full py-2 px-4 mb-3 leading-tight text-sm rounded-full
                                text-violet-700 border-2 border-violet-400 transition-all
                                hover:bg-violet-400 hover:text-white font-semibold'
                            type='submit'>
                            {query.id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
