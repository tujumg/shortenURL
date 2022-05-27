const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')
const shortenURL = require('../../shorten.js')

router.get('/',(req,res)=>{
    res.render('index')
})

router.post('/',(req,res)=>{
    const originalURL = req.body.url
    console.log(originalURL)
    const shortURL = shortenURL()
    if(!originalURL){res.redirect('/')}
    URL.findOne({originalURL})
        .lean()
        .then(data=>{
            if(!data){
                URL.create({originalURL,shortURL})
                res.render('index',{shortURL})
            } else {
                res.render('index',{shortURL:data.shortURL})
            }
        })
        .catch(error => console.error(error))
})

router.get('/:shortenURL',(req,res)=>{
    const shortenURL = req.params.shortenURL
    console.log(shortenURL)
    URL.findOne({shortURL:shortenURL})
        .lean()
        .then(data=>{
            if(!data){
                res.render('error',{errorMessage:'Cannot find this URL',
                    errorURL:'http://localhost:3000/'+shortenURL})
            } else {res.redirect(data.originalURL)
            }
        })
        .catch(error => console.error(error))
})
module.exports = router

