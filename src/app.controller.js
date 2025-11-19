import { configDotenv } from "dotenv"
import { connection } from "./Database/connection.js"
configDotenv()

const bootstrap =async(app ,express)=>{
    app.use(express.json())
   await connection()

}

export default bootstrap;