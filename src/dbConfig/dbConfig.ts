import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connted', () =>{
            console.log('mongodb connected sucessfully')
        })

        connection.on('error',(err) =>{
            console.log('mongo connection error plz make sure MongoDB is running,' + err)
            process.exit()
        })
    } catch (error) {
        console.log("something went wong")
        console.log(error )
    }
}