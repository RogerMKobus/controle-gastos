import { app } from "./app";

app.listen(process.env.EXPRESS_PORT, () => console.log(`Server is running in ${process.env.EXPRESS_PORT}`))