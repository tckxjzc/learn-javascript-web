

console.log('start');
let chooseFile1=document.getElementsByClassName('choose-file-1')[0];
let cardBody=document.getElementsByClassName('card-body')[0];
chooseFile1.onchange=function () {
  console.log('%O',this);
  if(this.files.length<1){
      return
  }
  let file=this.files[0];
  let fileUrl=URL.createObjectURL(file);
  console.log(file)
  if(file.name.endsWith('.mp3')){
    let audioEl=document.createElement('audio');
    audioEl.src=fileUrl;
    audioEl.controls=true;
    cardBody.appendChild(audioEl);
  }
};