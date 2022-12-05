const express = require('express');
const router = express.Router()
const app = express();
app.use(express.urlencoded({ extended: false}));
app.set('view-engine', 'html');



router.get('/home', (req, res) => {
    res.sendFile('blog.html', { root: 'views' })  
});



module.exports = router;
