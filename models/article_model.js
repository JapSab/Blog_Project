const express = require('express');
const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const articleSchema = new Schema( {
	
	title: {
        type: String,
        required: true


    },
    description: {
        type: String
    },

    markdown: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    slug: {
        type: String,
        required: true,
        unique: true
    }


});
articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true,
        strict: true })
    }
    next()
})



Article = mongoose.model('Article', articleSchema);
module.exports = Article




