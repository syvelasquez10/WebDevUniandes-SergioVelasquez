"use strict";

Red(document.getElementById("githubID").text);

function Red(usuario) {
    var valores;

   $.get("https://api.github.com/users/"+usuario+"/followers").then(function(data, status){
      valores=data;
       cargarRed();
    });

    function cargarRed() { 
        
        var nodos =[{id:1,label:usuario}];
        var caminos =[];
        
        for(var i=0;i<valores.length;i++){
            nodos.push({id:i+2,label:valores[i].login});
            caminos.push({from:1,to:i+2});
        }
        
        // create an array with nodes
        var nodes = new vis.DataSet(nodos);

        // create an array with edges
        var edges = new vis.DataSet(caminos);

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {};

        // initialize your network!
        var network = new vis.Network(container, data, options);
    }

} 



setTimeout(function(){ 
    
    $('mynetwork').on("Click",function (params) {
      console.log(params);
    });
    }
,1300);