//fetching data
let json = (function () {
    let json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': './data.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

//all the submit action

function onSubmit(){
	let val = document.getElementById('number').value * 1;
	let sea = document.getElementById('season').value *1 ;
	let id = document.getElementById('id').value *1 ;
    let text = (document.getElementById('text').value).toLowerCase();

	if(val && sea){
        let new_Season = json.filter(x => x.season === sea);
        let episode = new_Season.filter(x => x.number === val);
        errorContent(episode);
        removeItem();
        create(episode);
        resetData();  
       return console.log(episode);
	} 

    if(id){
        let episode = json.filter(x => x.id === id);
        errorContent(episode);
        removeItem();
        create(episode);
        resetData();
        return console.log(episode);
    }

    if(text){
        let episode = json.filter(x => x.name.toLowerCase().includes(text));
        errorContent(episode);
        removeItem();
        create(episode);
        resetData();
        return console.log(episode);
    }

    errorValue(sea, val, id, text); 


}


//creating a div tag

function create(episode){
          for(let i = 0; i< episode.length; i++){

         const elm = document.createElement('div');
         elm.classList.add('card');
         const img = document.createElement('img');
         img.src= episode[i].image.original;
         img.classList.add('img-card');
         elm.appendChild(img);
         const con = document.createElement('div');
         con.classList.add('container');
         elm.appendChild(con);

         const headerTag = document.createElement('H4');
         con.appendChild(headerTag);

         const seasonTag = document.createElement('SMALL');
         con.appendChild(seasonTag);

         const smallTag = document.createElement('SMALL');
         con.appendChild(smallTag);

         const paratag = document.createElement('P');
         con.appendChild(paratag);

         
         const conText = document.createTextNode('Episode name:' + ' '+episode[i].name);
         const seasonText = document.createTextNode('Season: '+episode[i].season+'  Episode: '+episode[i].number)
         const airtext = document.createTextNode('  Air Date:'+ ' ' + episode[i].airdate+' Runtime: ' + episode[i].runtime);
         const detailText = document.createTextNode('Details:' + ' '+episode[i].summary);
         

         headerTag.appendChild(conText);
         seasonTag.appendChild(seasonText);
         smallTag.appendChild(airtext);
         paratag.appendChild(detailText);
         

         document.getElementById('main').appendChild(elm);

            
        }

    }

//remove a div

function removeItem(){
   [...document.getElementsByClassName("card")].map(n => n && n.remove());
}

//error content

function errorContent(episode){
    if(episode.length === 0){
        alert('Sorry! there is no content for this input try another one');
            }

}

function errorValue(sea, val, id, text){
     if(!sea || !val || !id || !text){
        alert('Please fill desired input fields with valid data')
    }
   
}

//reset fields after submitting the form
function resetData() {
    document.getElementById("form-data").reset();
    document.getElementById('id').disabled = false;
    document.getElementById('text').disabled = false;
    document.getElementById('season').disabled = false; 
    document.getElementById('number').disabled = false;

}

//enable particular field

function enableSeaval(){
    document.getElementById('id').disabled = true;
    document.getElementById('text').disabled = true;
}

function enableId(){
    document.getElementById('text').disabled = true;
    document.getElementById('season').disabled = true; 
    document.getElementById('number').disabled = true;
}

function enableText(){
    document.getElementById('id').disabled = true;
    document.getElementById('season').disabled = true; 
    document.getElementById('number').disabled = true;
}







