import { Client } from 'pg';
import 'dotenv/config'

const client = new Client({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})

client.connect((err) => {
if(err) {
    console.error(`connection error ${err.stack}`)
}else{
    console.log('connected')
}

})

export default client;