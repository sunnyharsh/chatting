window.addEventListener("load" , init);

function init(){
    var socket=io.connect("http://localhost:4000");
    var message=document.getElementById('message');
    var handle=document.getElementById('handle');
    var btn=document.getElementById('send');
    var output=document.getElementById('output');
    var feedback=document.getElementById('feedback');
    console.log("feedback is::: " , feedback);
    //************data push on server***************
    btn.addEventListener('click', ()=>{
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
      });

      socket.on('chat', (data)=>{
        feedback.innerHTML= " ";
         output.innerHTML += '<p><strong>' + data.handle + 
         ': </strong>' + data.message + '</p>';
      });

      message.addEventListener('keypress' , ()=>{
        socket.emit('typing' ,handle.value); 
      });
      socket.on('typing', (data)=>{
          feedback.innerHTML='<p> <em>' + data + ' is typing a message </p></em>';
      })
}
