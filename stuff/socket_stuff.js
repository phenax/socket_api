var parseHTML = function(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

module.exports= (io,app)=> {
	io.sockets.on('connection',(socket)=> {
		socket.on('recieve',(data)=> {
			
			app.set('current_state',data.state);

			socket.broadcast.emit('transmission',{
				state: parseHTML(data.state)
			});
		});
	});
};