function newList(data,check){
    appendVal=""
        for(i=0;i<data.length;i++){
            appendVal+=`<li class="song-row" data-index=${i}>
            <span class="song-index">${i+1}.</span>
            <span class="song-icon"> 
                <img src="${data[i]['img']}"/>
                <div class="img-cover" data-status='stop'></div>
            </span>
            <span class="song-name">${data[i]['song']}</span>
            <span class="movie-name">${data[i]['movie']}</span>
            <span class="song-duration">${data[i]['duration']}</span>
            <span class="song-remove">&#10005;</span>
            </li>`
        }
        if(check){
            appendVal+="<div id='preHtml'><button id='addNew'>Add Song</button></div>"
        }
        $(".song-collection").html(appendVal)
}

var data_recommend = [{img:"./Images/72490.jpg",song:"Khoo Gaye Hum Kaha",movie:"Baar Baar Dekho",duration:"4:10"},{img:"./Images/sasein.jpeg",song:"Saasein",movie:"Kaarwa",duration:"4:26"},{img:"./Images/72490.jpg",song:"Dariya",movie:"Baar Baar Dekho",duration:"5:20"},{img:"./Images/sasein.jpeg",song:"Kadam Song",movie:"Kaarwa",duration:"4:10"},{img:"./Images/72490.jpg",song:"Dariya",movie:"Baar Baar Dekho",duration:"5:20"},{img:"./Images/72490.jpg",song:"Cold/Mess",movie:"Cold/Mess(Prateek Kuhad)",duration:"2:50"}]
newList(data_recommend,false)
var data_my_list = [{img:"./Images/jawaani.jpeg",song:"Gallan Kardi",movie:"Jawaani Jaaneman",duration:"4:10"},{img:"./Images/72490.jpg",song:"Dilbara",movie:"Pati Patni Aur Woh",duration:"4:10"},{img:"./Images/72490.jpg",song:"Tu hi yaar mera",movie:"Pati Patni Aur Woh",duration:"3:45"},{img:"./Images/72490.jpg",song:"Malang",movie:"Malang",duration:"4:10"}];
var popular_list = [{img:"./Images/malang.jpeg",song:"Humrah",movie:"Malang",duration:"4:10"},{img:"./Images/malang.jpeg",song:"Phir na milen kabhi",movie:"Pati Patni Aur Woh",duration:"4:10"},{img:"./Images/malang.jpeg",song:"Hui Malang",movie:"Malang",duration:"4:10"}]


$("#recommendation").click(function(){
    if($(this).parent().data("select")!="recommendation"){
        newList(data_recommend,false)
        $(this).parent().data("select","recommendation")
    }
});

$("#my-list").click(function(){
    if($(this).parent().data("select")!="my-list"){
        newList(data_my_list,true)
        $(this).parent().data("select","my-list")
    }
});

$("#popular").click(function(){
    if($(this).parent().data("select")!="popular"){
        newList(popular_list,false)
        $(this).parent().data("select","popular")
    }
});

$(document).on("click",".song-remove",function(){
    listType = $("#recommendation").parent().data("select")
    if(listType=="recommendation"){
        data_recommend.splice(parseInt($(this).parent().data("index")),1)
        newList(data_recommend)
    }
    if(listType=="my-list"){
        data_my_list.splice(parseInt($(this).parent().data("index")),1)
        newList(data_my_list,true)
    }
    if(listType=="popular"){
        popular_list.splice(parseInt($(this).parent().data("index")),1)
        newList(popular_list)
    }
})

addcheck=true

$(document).on("click","#addNew",function(){
    if(addcheck){
        newAdd=  `<div id="newpop"> <input id="getnewsong" type="text" list="songs" placeholder="Search">
        <datalist id="songs">
            <option value="Khoo Gaye Hum Kaha">
            <option value="Saasein">
            <option value="Dariya">
            <option value="Kadam Song">
            <option value="Cold/Mess">
          </datalist></div>`
        $("#preHtml").prepend(newAdd)
        $(this).text("Cancel")
        addcheck=false
    }
    else{
        $("#newpop").remove();
        $(this).text("Add Song")
        addcheck=true
    }
});

$(document).on("change","#getnewsong",function(){
    value = $(this).val()
    data_my_list.push({img:"./Images/jawaani.jpeg",song:value,movie:"Jawaani Jaaneman",duration:"4:10"})
    newList(data_my_list,true)
})

$(document).on({
    mouseenter: function () {
        if($(this).data("status")=="stop"){
            $(this).html("&#9658;")
        }
        else{
            $(this).html("| |")
        }
    },
    mouseleave: function () {
        $(this).html("")
    }
},".img-cover")

$(document).on("click",".img-cover",function(){
    if($(this).data("status")=="stop"){
        $(this).data("status","play")
        $(this).html("| |")
        
    }
    else{
        $(this).data("status","stop")
        $(this).html("&#9658;")
    }
})