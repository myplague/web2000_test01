var audio = $("audio")[0];


function sizeControls() {
    var audioWidth = $("audio").width();
    $("#audio-controls").css("width", audioWidth + "px");
    console.log(audioWidth);
}

window.onload = sizeControls
window.onresize = sizeControls;
audio.addEventListener("loaddata",function(){
  setTimeout(sizeControls,100);
});
loadState();



$("#backward").click(function() {

    if (!audio.paused) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
})

$("#forward").click(function() {

    if (!audio.paused) {
        audio.currentTime = Math.max(0, audio.currentTime + 10);
    }
})


$("#load-audio").click(function(){
  if(!$("#next-audio").val())
  return;
  audio.src = $("#next-audio").val();
});

function saveState(){
  localStorage.setItem("last-played",audio.src);
  localStorage.setItem("last-location",audio.currentTime);
}
setInterval(saveState,1000);

function loadState(){
  if(!localStorage.getItem("last-played")|| !localStorage.getItem("last-location"))
  return;
  audio.src = localStorage.getItem("last-played");
  audio.play()
  .then(()=>audio.currentTime = localStorage.getItem("last-location"))
  .then(()=>audio.pause());
}
