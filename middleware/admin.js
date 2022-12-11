module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Admin access denied.');

    next();
};

// this funnction will be used later to make admin features available on the blog