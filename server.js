

var soap = require('soap');
var bodyParser = require('body-parser');
var express = require('express');
var axios = require('axios');
const cors = require('cors');
const path = require("path");
var http = require('http');

var api = require('./api');
var app = express();

const URL = "https://gateway.froid.ml/graphql"; //proxy url

var service = {
    ws: {
        questionList: {
            questions : async function(args) {
                var id_usuario = args.id_usuario
                const questions = await axios.post(URL, {
                query: `
                  query {
                    listMaterias(id_usuario : "${id_usuario}"){
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
                    `
                  })
                if(questions &&  questions.data &&  questions.data.data &&  questions.data.data.listMaterias){

                    const asignature = questions.data.data.listMaterias[0];

                    console.log("entre1");
                
                    return {    
                                res : "Random question from: "+id_usuario,
                                id : asignature.id,
                                id_usuario : asignature.id_usuario,
                                id_semestre : asignature.id_semestre,
                                id_tipologia : asignature.id_tipologia,
                                nombre : asignature.nombre,
                                prerequisitos : asignature.prerequisitos,
                                creditos : asignature.creditos,
                                nota : asignature.nota};
                }
                else{
                  if(questions.data.data.listMaterias.ERROR){
                      console.log("entre1");
                    return {res: questions.data.data.listMaterias.ERROR}
                  }

                  console.log("entre1");
                  return {res: "ERROR"};
                }
            },
        }
    }
}


 async function test(){
     var query="";
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
            `
        })

    if(questions &&  questions.data &&  questions.data.data &&  questions.data.data.listMaterias){

       const asignature = questions.data.data.listMaterias[0];

       console.log({    id : asignature.id,
                                id_usuario : asignature.id_usuario,
                                id_semestre : asignature.id_semestre,
                                id_tipologia : asignature.id_tipologia,
                                nombre : asignature.nombre,
                                prerequisitos : asignature.prerequisitos,
                                creditos : asignature.creditos,
                                nota : asignature.nota});
                
                    return {    id : asignature.id,
                                id_usuario : asignature.id_usuario,
                                id_semestre : asignature.id_semestre,
                                id_tipologia : asignature.id_tipologia,
                                nombre : asignature.nombre,
                                prerequisitos : asignature.prerequisitos,
                                creditos : asignature.creditos,
                                nota : asignature.nota};
    }

    
 }

    var xml = require('fs').readFileSync('service.wsdl', 'utf8');

    //http server example
    var server = http.createServer(function(request,response) {
        response.end('404: Not Found: ' + request.url);
    });

    server.listen(3000);
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
    });

