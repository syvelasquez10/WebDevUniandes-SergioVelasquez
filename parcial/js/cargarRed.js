"use strict";
var network;
var nodes;
var edges;
var nodos;
var caminos;

var inicial = document.getElementById("githubID").value;
function crearRed() {
    $(".jumbotron").fadeOut("slow");
    $(".refrescar").show();
    var usuario = document.getElementById("githubID").value;
    
    console.log(usuario);
    var valores;

   $.get("https://api.github.com/users/"+usuario+"/followers").then(function(data, status){
      valores=data;
       cargarRed();
    });

    function cargarRed() { 
        
        nodos =[{id:1,label:usuario}];
        caminos =[];
        
        for(var i=0;i<valores.length;i++){
            nodos.push({id:i+2,label:valores[i].login});
            caminos.push({from:1,to:i+2});
        }
        // create an array with nodes
        nodes = new vis.DataSet(nodos);

        // create an array with edges
        edges = new vis.DataSet(caminos);

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {};

        // initialize your network!
        network = new vis.Network(container, data, options);
        listen();
    }

} 

function nuevaRed(nodoInicio) {
    var user = nodos[nodoInicio-1].label;
    var valores;

   $.get("https://api.github.com/users/"+user+"/followers").then(function(data, status){
      valores=data;
       cargarNuevaRed();
    });

    function cargarNuevaRed() { 
        var contador= nodos.length+1;
        var iguales = false;
        for(var i=0;i<valores.length;i++) {
            for(var j=0;j<nodos.length && !iguales;j++) {
                if(nodos[j].label===valores[i].login) {
                    iguales = true;
                }
            }
            if(!iguales) {
                nodos.push({id:i+contador,label:valores[i].login});
                caminos.push({from:nodoInicio,to:i+contador});
            }        
        }
        // create an array with nodes
        nodes= new vis.DataSet(nodos);

        // create an array with edges
        edges = new vis.DataSet(caminos);

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {};

        // initialize your network!
        network = new vis.Network(container, data, options);
        listen();
    }

} 


function listen(){ 
    network.on("click", function (params) {
        console.log(params.nodes[0]);
        if(!(params.nodes[0]===1)){
            nuevaRed(params.nodes[0]);
        }
    });
    network.on("doubleClick", function (params) {
        console.log(nodos[params.nodes[0]-1]);
        window.location.href = "http://github.com/"+nodos[params.nodes[0]-1].label;
    });
}

function mostrar(){ 
    $(".jumbotron").fadeIn("slow");
    $(".refrescar").hide();
}