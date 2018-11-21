const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


const port = process.env.PORT || 8080;




hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	console.log(text)
	return text.toUpperCase();
})




app.use((request, response, next) => {
	var time = new Date().toString();
	var log = `${time}: ${request.method} ${request.url}`;

	fs.appendFile('server.log', log + '\n', (error) =>{
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

app.get('/', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'welcome to the info page!',
		link: {
			register: '/register'
		},
		linklogin:{
			login: '/login'
		}

	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'welcome to the about page!',
	});
});

app.get('/login', (request, response) => {
	response.render('login.hbs', {
		welcome: 'welcome!'
	});
});

app.get('/register', (request, response) => {
	response.render('register.hbs', {
		welcome: 'welcome!'
	});
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})


app.listen(8080, () => {
	console.log('Server is up on the 8080');

});