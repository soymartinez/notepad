import { connect, connection } from 'mongoose'

const singelton = {
    isConnected: false
}

export function dbConnect() {
    if (singelton.isConnected) return;

    const db = connect(process.env.MONGO_URI)
    singelton.isConnected = db.connection
}

connection.on('connected', () => {
    console.log('Mongoose connected to');
})

connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
})