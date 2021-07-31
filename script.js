let recordedBlobs
let canvas = document.getElementById("canvas");
let ctx= canvas.getContext("2d")


const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');





document.querySelector('button#start').addEventListener('click',  () => {
        let video= document.getElementById("gum")
        recordButton.disabled =false
        const setup=()=>{
            navigator.mediaDevices.getUserMedia({

                video :{width :600,height :400}
            })
            .then((stream)=>{
                video.srcObject=stream
                window.stream=stream
            })
            
            
            
        }
        setup()
  })

  recordButton.addEventListener('click',()=>{
      if (recordButton.textContent==="Record"){
          startrecording()
      }
      else{
          stoprecording()
          recordButton.textContent="Record"
          playButton.disabled=false
      }
  })

  function stoprecording() {
      mediaRecorder.stop()
  }

  function startrecording(){
      recordedBlobs=[]
      let options = {mimeType: 'video/webm;codecs=vp9,opus'};
      try{
        mediaRecorder = new MediaRecorder(window.stream, options);
      }
      catch(e){
        console.log(e)
      }
      recordButton.textContent="Stop Recording"
      playButton.disabled=true


      mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ');
      }
      mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
  }

  function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }
  playButton.addEventListener('click', () => {
    const superBuffer = new Blob(recordedBlobs, {type: 'video/360'});
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
     recordedVideo.controls = true;
     recordedVideo.play();
  });
  var count = 0;
  var coun =0
  var y=0
  var z =0
  var c=0
  


  const detect= async() => {

    const prediction=await model.estimateFaces(video,false);
    if(z==0) {
      y=prediction[0].topLeft[0]
      z++;
      
    }
    ctx.drawImage(video,0,0,600,400)

    
    for (let i = 0; i < prediction.length; i++) {
      ctx.beginPath()
      ctx.lineWidth="4";
      ctx.strokeStyle="blue"
      const start = prediction[i].topLeft;

      


     
/////////////////////////////////////////////////////////////////////////////////////////////////
      if( ((prediction[i].topLeft[0]<=80)||(prediction[i].topLeft[0]>=400)) ||((prediction[i].topLeft[1]<=30)||(prediction[i].topLeft[1]>=300))){count=count+1;alert("please move to centre")}

      if(count==3)
      {alert("game over");
      window.location.reload(true)}
      if ((prediction[i].topLeft[1]<=30)||(prediction[i].topLeft[1]>=300)) {coun=coun+1; alert("please move to centre")}
      if(coun==3){alert("game over");location.reload()}
////////////////////////////////////////////////////////////////////////////////////////////////////
      






var x=prediction[i].topLeft[0]

if(Math.abs(x-y)>=45&&Math.abs(x-y)<=75){
  c++
  if(c==10){
    alert("wasd")
  }
}








      const end = prediction[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      
      
      // Render a rectangle over each detected face.
      ctx.rect(start[0], start[1], size[0], size[1]);
      ctx.stroke();
      ctx.fillStyle ="red"
    }
     console.log(prediction)
    if (prediction.length>1){
      alert("more than one face")
      location.reload()
    }
  }
  let video= document.getElementById("gum")
  video.addEventListener("loadeddata",async() => {
    model= await blazeface.load();

    
    setInterval(detect,100)
  })