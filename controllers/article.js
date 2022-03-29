const con = require('../utils/db')

const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article"
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}
const getArticleBySlug = (req, res) => {
    let query = `select article.id, article.name, article.slug, article.image, article.body, article.published, author.name as author, author.id as author_id from article JOIN author ON article.author_id = author.id where slug = "${req.params.slug}";`
    let article
    con.query(query, (err, result) => {
        if (err) throw err
        article = result
        // console.log(result)
        res.render('article', {
            article: article
        })
    })
}

module.exports = {
    getAllArticles,
    getArticleBySlug
}