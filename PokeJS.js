
var buttonOne;
var name;
var type;
var id;
var hp;
function myFunc(name,id,type,hp){
    document.getElementById("PokeTab").innerHTML= "<tr><td>"+name+"</td><td>"+id+"</td><td>"+type+"</td><td>"+hp+"</td></tr>"
}
buttonOne= document.getElementById('searchB');
buttonOne.addEventListener('click', function(){getPoke()});
buttontwo=document.getElementById('saveB');
buttontwo.addEventListener('click',function(){save()})
buttonthree = document.getElementById('seeMyPoke')
buttonthree.addEventListener('click',function(){see()})
buttonfour = document.getElementById('Random Button')
buttonfour.addEventListener('click',function(){s3upload()})

function getPoke(){
   name =  document.getElementById('searchName').value;
   console.log('This is my name:'+name);
   let xhttp= new XMLHttpRequest();
   xhttp.onreadystatechange = function(){
       //console.log("Ready state has changed");
       
       if(xhttp.readyState==4 && xhttp.status==200){
           //console.log("ready state is 4!!!!!!!!!!")
           let sw = JSON.parse(xhttp.responseText);
           //console.log(sw);
           
           console.log(sw);
           type = sw.types[0].type.name;
           hp = sw.stats[0].base_stat;
           id = sw.id;
           console.log(id)
           console.log(sw.sprites.front_default)
           
           //document.getElementById('displayImg').innerHTML='<img id=PokeImg src='+sw.sprites.front_shiny+' />'

           myFunc(name,id,type,hp);
        
       }
   }


xhttp.open("Get", 'https://pokeapi.co/api/v2/pokemon/'+name.toLowerCase());
xhttp.send();

}
function save(){
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        //console.log("Ready state has changed");
        
        if(xhttp.readyState==4 && xhttp.status==200){
            //console.log("ready state is 4!!!!!!!!!!")
            let sw = (xhttp.responseText);
           console.log(sw)
           if(sw=="Saved"){
           alert('Saved')
           }
        }
    }
 
 
 xhttp.open("Post", 'http://ec2-3-138-110-126.us-east-2.compute.amazonaws.com:9025/new/'+name.toLowerCase()+'/'+id+'/'+type+'/'+parseInt(hp,10));
 xhttp.send();
}
function see(){
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        //console.log("Ready state has changed");
        
        if(xhttp.readyState==4 && xhttp.status==200){
            //console.log("ready state is 4!!!!!!!!!!")
            let sw = JSON.parse(xhttp.responseText);
           console.log(sw)
           let str;
           for(i=0;i<sw.length;i++){
               if(sw[i]!=undefined){
               str = str + '<tr><td>'+sw[i].name+'</td><td>' + sw[i].id+ ' </td><td>' +sw[i].type+' </td><td>'+sw[i].hp+'</td></tr>'
               }
            }
           document.getElementById("PokeTab2").innerHTML=str;
        }
    }
 
 
 xhttp.open("Get", 'http://ec2-3-138-110-126.us-east-2.compute.amazonaws.com:9025/Allpoke');
 xhttp.send();
}
function s3upload() {
    console.log(document.getElementById('imgUp').value);
    let pic =document.getElementById('imgUp').value;
    console.log(pic);
    let url = 'https://myfirstbuckettester.s3.us-east-2.amazonaws.com/'+pic;
    if(testImage(url)){
        return false;
    }
    console.log(url);
    document.getElementById('rando').innerHTML='<img src='+url+ ' />'
    return true;
   
    }
    function testImage(URL) {
        var tester=new Image();
        //tester.onload=imageFound;
        tester.onerror=imageNotFound;
        tester.src=URL;
    }
    
    function imageFound() {
        alert('That image is found and loaded');
    }
    
    function imageNotFound() {
        alert('That image was not found.');
        return true;
    }
    