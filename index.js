const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: true
});

const checkAge = (req, res, next) => {
	if (req.query.age) return next();
	return res.redirect('/');
};

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

app.get('/', (req, res) => {
	return res.render('age');
});

app.post('/check', (req, res) => {
	const { age } = req.body;

	if (parseInt(age) >= 18) {
		return res.redirect(`/major?age=${age}`);
	} else {
		return res.redirect(`/minor?age=${age}`);
	}
});

app.get('/major', checkAge, (req, res) => {
	const { age } = req.query;
	return res.render('major', { age });
});

app.get('/minor', checkAge, (req, res) => {
	const { age } = req.query;
	return res.render('minor', { age });
});

app.listen(3000);
