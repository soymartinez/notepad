import Layout from 'components/layout'
import { useRouter } from 'next/router'
import { IoClose } from 'react-icons/io5'

export default function Deletetask({ data }) {
    const router = useRouter()
    const deleteTask = async (id) => {
        const response = await fetch(`https://notepad.omgismartinez.vercel.app/api/tasks/${id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            router.push('/')
        }
    }
    return (
        <Layout title={'Delete Task'}>
            <div className='flex flex-wrap gap-2'>
                {
                    data.map(task => (
                        <article key={task._id}
                            className={`w-full p-4 rounded-md transition-all relative
                      border-4 border-violet-400 hover:border-violet-500`}>
                            <h2>
                                <span className='font-bold'>Title:</span> {task.title}
                            </h2>
                            <h2>
                                <span className='font-bold'>Description:</span> {task.description}
                            </h2>
                            <h2>
                                <span className='font-bold'>Completed:</span> {task.completed.toString()}
                            </h2>
                            <button className='bg-red-500 hover:bg-red-600 text-white w-9 h-5
                                                -top-3 -right-3 font-bold rounded-full absolute transition-all 
                                                hover:scale-105 active:scale-95'
                                onClick={() => deleteTask(task._id)}><IoClose /></button>
                        </article>
                    ))
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(process.env.API_URL + '/tasks')
    const data = await res.json()
    return {
        props: {
            data,
        },
    }
}
