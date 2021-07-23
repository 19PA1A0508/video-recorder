let recordedBlobs



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
    const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
     recordedVideo.controls = true;
     recordedVideo.play();
  });

  const detect= async() => {
    const prediction=await model.estimateFaces(video,false);

    console.log(prediction)
  }
  let video= document.getElementById("gum")
  video.addEventListener("loadeddata",async() => {
    model= await blazeface.load();
    detect()
  })