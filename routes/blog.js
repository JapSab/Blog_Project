const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const auth = require('../middleware/check-auth');
const token = require('../models/user_model');
const article_model = require('../models/article_model')
const methodOverride = require('method-override');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: false}));

router.get('/home', auth, async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/blog', {articles: articles})
    
});

router.post('/home', auth,  (req, res) => {
    res.clearCookie('token').redirect('/user/login');
});


router.get('/new', auth, (req, res) => {
   res.render('articles/new', {article: new Article()});
})


router.get('/edit/:id', auth, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article:  article });
 })
 

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'));



router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null) res.redirect('/blog/home')
    res.render('articles/show', {article: article})
})

router.post('/', auth, async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/blog/home')
})


function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
         
         try{
             article = await article.save();
             res.redirect('/blog/home')
         } catch (error) {
            res.render(`articles/${path}`, {article: article})
         }
    }
};



module.exports = router;
