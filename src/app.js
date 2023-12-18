import  express from "express";
import { routerMascotas } from "../rutas/mascotasRouter.js";
import { db } from "../database/conexion.js";
import cors from "cors"

//crear instancia de express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//verificar conexion a BD
db.authenticate().then(()=>{
    console.log(`Base de Datos conectada de manera exitosa`);
}).catch(err=>{
    console.log(`Error al conectarse a la Base de Datos ::: ${err}`);
})

//DEFINIR RUTAS
app.get("/",(req,res)=>{
    res.send("Hola BackEnd Mysql");
});


//rutas
app.use("/mascotas",routerMascotas);

//puerto de servidor
const PORT=8000;



//verificar que pueda sincronizar con la BD
db.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en puerto ${PORT}`);
    });
}).catch(err=>{
    console.log(`Error al sincronizar Base de Datos ${err}`);
});

