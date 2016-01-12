module.exports= (fs,app,path)=> {
	app.get('/',(req,res,next)=> {
		var state= app.get('current_state');
		var data= fs.readFileSync(path.join(__dirname,'../views/index.html'),'utf8');
		var text= (state == 'on')? 'off': 'on';
		data= data.replace(/<{current}>/g,text);
		data= data.replace(/<{current_state}>/g,state);
		res.send(data);
	});
};