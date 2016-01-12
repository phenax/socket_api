module.exports= (fs,app,path)=> {
	app.get('/api',(req,res,next)=> {
		var state= app.get('current_state');
		var data= fs.readFileSync(path.join(__dirname,'../views/api.html'),'utf8');
		data= data.replace(/<{current}>/g, JSON.stringify({ state }));
		res.send(data);
	});
};