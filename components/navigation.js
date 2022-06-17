import { useRouter } from 'next/router'

export default function Navigation() {
    const router = useRouter()
    const nav = [
        { name: 'New task', href: '/createtask' },
        { name: 'Update task', href: '/updatetask' },
        { name: 'Delete task', href: '/deletetask' },
    ]
    return (
        <div className='w-full my-4'>
            <h1 onClick={() => router.push('/')}
                className={`text-4xl text-center tracking-tighter font-black w-full cursor-pointer`}>
                Notepad
            </h1>
            <p className={`text-xl font-medium text-center text-gray-900`}>
                A simple notepad application
            </p>
            <div className='flex justify-center items-center 
                          flex-wrap max-w-xs mx-auto gap-2
                          text-base font-semibold py-4'>
                {
                    router.query.id ?
                        <button
                            onClick={() => router.push(`/${router.query.id}`)}
                            key={'Update'}
                            className={`bg-green-400 hover:bg-green-300 
                                    hover:scale-105 active:scale-95
                                    rounded-full px-2`}>
                            {'Update Task'}
                        </button>
                        :

                        nav.map(({ name, href }) => (
                            <button
                                onClick={() => router.push(href)}
                                key={name}
                                className={`${router.asPath === href
                                    ? 'bg-green-400 hover:bg-green-300'
                                    : 'bg-violet-400 hover:bg-violet-300'}   
                                    hover:scale-105 active:scale-95
                                    rounded-full px-2`}>
                                {name}
                            </button>
                        ))
                }
            </div>
        </div>
    )
}
