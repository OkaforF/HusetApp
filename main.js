


function getAllEvents (){
    fetch("http://okafor.dk/wordpress/wp-json/wp/v2/events?_embed&per_page=15")
    .then(res=>res.json())
    .then(showEvents);

}
function getAllEventsByTag (id){
    fetch("http://okafor.dk/wordpress/wp-json/wp/v2/events?_embed&tags="+id)
    .then(res=>res.json())
    .then(showEvents);

}

function getSingleEventById(myId){
    console.log (myId);
   fetch("http://okafor.dk/wordpress/wp-json/wp/v2/events/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(showSingleEvent);

}


function getMenu(){
    fetch("http://okafor.dk/wordpress/wp-json/wp/v2/tags")
    .then(e=>e.json())
    .then(showMenu)
}

function showMenu(tags){
    //console.log(tags);
    let linkTemplate = document.querySelector("#linkTemplate").content;



    tags.forEach(function(tag){

        if(tag.description=="music"){
          let clone =linkTemplate.cloneNode(true);
    let parent =document.querySelector("#tag-menu");
    clone.querySelector("a").textContent=tag.name;
        clone.querySelector("a").setAttribute("href", "index.html?tagid="+tag.id);
    parent.appendChild(clone);
      }
    });


}



//http://okafor.dk/wordpress/wp-json/wp/v2/events?tags=73
function showSingleEvent(json){
    console.log(json);
    document.querySelector("#single h1").textContent=json.title.rendered;
    document.querySelector(".price").textContent=json.acf.admission_price;
    document.querySelector(".siimg").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        document.querySelector(".content").innerHTML=json.content.rendered;
        document.querySelector(".stage").textContent=json.acf.stage;
        document.querySelector(".date").textContent=json.acf.date;


}




function showEvents(data){
  console.log(data)
    let list=document.querySelector("#list");
    let template=document.querySelector("#eventTemplate").content;

    data.forEach(()=>{})

    data.forEach(function(theEvent){
        console.log(theEvent)
          let clone=template.cloneNode(true);
  let title = clone.querySelector(".title");
  let date = clone.querySelector(".date");
  let stage = clone.querySelector(".stage");

  let price = clone.querySelector(".price");
  let img = clone.querySelector(".mimg");
  let presale= clone.querySelector(".presale");
  let content = clone.querySelector(".content");
  let facebook = clone.querySelector(".facebook");
  let startTime = clone.querySelector(".start-time");

let link = clone.querySelector("a.read-more");




        title.textContent= theEvent.title.rendered;
        date.textContent= theEvent.acf.date;
        stage.textContent= theEvent.acf.stage;
        startTime.textContent= theEvent.acf.event_start_time;


        console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

       img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
      price.textContent= theEvent.acf.admission_price;
      presale.textContent= theEvent.acf.presale_price;
      facebook.innerHTML= theEvent.acf.facebook_link;


        link.setAttribute("href", "event.html?id="+theEvent.id);


     /* content.innerHTML= theEvent.content.rendered;*/

    list.appendChild(clone);
})
}


let searchParams = new URLSearchParams(window.location.search);
let id =searchParams.get("id");
//console.log(id)
let tagid =searchParams.get("tagid");
//console.log(tagid)
getMenu();

if (id){
    getSingleEventById(id);

} if (tagid){
    getAllEventsByTag(tagid);
    console.log(tagid)
} else {
    getAllEvents();
}


//menu begin

let btn2 = document.querySelector('#btn2');
btn2.addEventListener('click', function(){
    let drop = document.querySelector('#drop2');
    console.log(drop);
    drop.classList.toggle('hide');
});

let btn3 = document.querySelector('#btn3');
btn3.addEventListener('click', function(){
    let drop = document.querySelector('#drop3');
    console.log(drop);
    drop.classList.toggle('hide');
});


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


//menu end






