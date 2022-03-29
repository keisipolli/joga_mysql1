const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))

app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const articleRoutes = require('./routes/article')
app.use('/', articleRoutes)
app.use('/article', articleRoutes)

app.get('/author/:author_id', (req, res) => {
    let query = `select article.id, article.name, article.slug, article.image, article.body, article.published, author.name as author, author.id as author_id from article JOIN author ON article.author_id = author.id where slug = "${req.params.slug}";`
    let articles = []
    let author
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        author = result[0]
        res.render('author', {
            articles: articles,
            author: author
        })
    })
})



app.listen(3000, () => {
    console.log('App is started at http://localhost:3000')
});