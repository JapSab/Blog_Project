const express = require('express');
const router = express.Router()
const app = express();
app.use(express.urlencoded({ extended: false}));
app.set('view-engine', 'ejs');



router.get('/home', (req, res) => {
    res.render('blog.ejs')
})



module.exports = router;
