var soap = require("soap");
var bodyParser = require("body-parser");
var express = require("express");
var axios = require("axios");
const cors = require("cors");
const path = require("path");
var http = require("http");
var connect = require("connect");
var logger = require("morgan");

var api = require("./api");

const URL = "https://gateway.froid.ml/graphql"; //proxy url

var service = {
    ws: {
        questionList: {
            questions: async function (args) {
                return await axios
                    .post(URL, {
                        query: `
                            query {
                                listMaterias(id_usuario : ${args.id_usuario}){
                                    id
                                    id_usuario
                                    id_semestre
                                    id_tipologia
                                    nombre
                                    prerequisitos
                                    creditos
                                    nota
                                }
                            }
                        `,
                    })
                    .then((val) => {
                        const asignature = val.data.data.listMaterias[0];

                        return {
                            id: asignature.id,
                            id_usuario: asignature.id_usuario,
                            id_semestre: asignature.id_semestre,
                            id_tipologia: asignature.id_tipologia,
                            nombre: asignature.nombre,
                            prerequisitos: asignature.prerequisitos,
                            creditos: asignature.creditos,
                            nota: asignature.nota,
                        };
                    })
                    .catch((e) => {
                        return { res: "ERROR" };
                    });
                {
                }
            },
        },
    },
};

async function test() {
    var query = "";
    const questions = await axios.post(URL, {
        query: `
            query {
            listMaterias(id_usuario : 31){
                id
                id_usuario
                id_semestre
                id_tipologia
                nombre
                prerequisitos
                creditos
                nota
            }
            }
            `,
    });

    if (
        questions &&
        questions.data &&
        questions.data.data &&
        questions.data.data.listMaterias
    ) {
        const asignature = questions.data.data.listMaterias[0];

        console.log({
            id: asignature.id,
            id_usuario: asignature.id_usuario,
            id_semestre: asignature.id_semestre,
            id_tipologia: asignature.id_tipologia,
            nombre: asignature.nombre,
            prerequisitos: asignature.prerequisitos,
            creditos: asignature.creditos,
            nota: asignature.nota,
        });

        return {
            id: asignature.id,
            id_usuario: asignature.id_usuario,
            id_semestre: asignature.id_semestre,
            id_tipologia: asignature.id_tipologia,
            nombre: asignature.nombre,
            prerequisitos: asignature.prerequisitos,
            creditos: asignature.creditos,
            nota: asignature.nota,
        };
    }
}

var xml = require("fs").readFileSync("service.wsdl", "utf8");

/*
    var app2 = connect()

        .use(logger())        

        

        .use(function(req, res){

        res.setHeader("Access-Control-Allow-Origin", "http://example.com");
        res.end('hello world\n');

    });*/

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin: *");
    next();
});

const corsOptions = {
    origin: "*",
    //origin: 'http://127.0.0.1:3000',
};
app.use(express.json({ limit: "10mb" }));
//To avoid CORS errors
app.use(cors(corsOptions));

//Use public dirname to serve static files
app.use(express.static(__dirname + "/public"));
//app.use('/uploads/drivers',express.static(path.join(__dirname, 'public/uploads/drivers')));

//body parser middleware are supported (optional)
app.use(
    bodyParser.raw({
        type: function () {
            return true;
        },
        limit: "5mb",
    })
);
app.listen(3000, function () {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, "/asignatures", service, xml, function () {
        console.log("server initialized");
    });
});

/*

   
    var server = http.createServer(app2);

    server.listen(3000, function () {

        console.log('server is listening');
    }); 

    soap.listen(server, '/asignatures', service, xml);
    console.log("server listening")
    console.log(service);

    app.use(function(req,res,next){
        res.header('Access-Control-Allow-Origin: *');
        next();
    })

    const corsOptions = {
        origin: '*',
        //origin: 'http://127.0.0.1:3000',
    };
    app.use(express.json({limit: '10mb'}));
    //To avoid CORS errors
    app.use(cors(corsOptions));

    //Use public dirname to serve static files
    app.use(express.static(__dirname + '/public'));
    //app.use('/uploads/drivers',express.static(path.join(__dirname, 'public/uploads/drivers')));

    //Require route files
    app.use('/interface', api.router);

    // Start server in specific port
    app.listen(3001, function(){
        // Actions on ready
        console.log('Server: Server is running');
    });*/
