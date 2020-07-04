const express = require("express");
const router = express.Router();
const { getSuggestedSongsByArtist, getSuggestedSongsByName, getSuggestedSongsByLyrics, getSuggestedSongsByNameAndLyrics, getSuggestedSongsByArtistAndSort } = require ('../Services/SearchService')

router.get("/", async (req,res) => {
    try {
        res.send('search!')
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/getSongsByArtist", async (req,res,next) => {
    
    let searchTxt  = req.query.artist;
    
    searchTxt = searchTxt.trim();
    try {
        let results = await getSuggestedSongsByArtist(searchTxt);
        res.data = results;
        next();
        
    }catch (err) {
        res.status(500).json({ message: err });
    }
});


router.get("/getSongsByName", async (req,res,next) => {
    
    let searchTxt  = req.query.song;
    
    searchTxt = searchTxt.trim();
    try {
        let results = await getSuggestedSongsByName(searchTxt);
        res.data = results;
        next();
        
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/getSongsByLyrics", async (req,res,next) => {
    
    let searchTxt  = req.query.lyrics;
    
    searchTxt = searchTxt.trim();
    try {
        let results = await getSuggestedSongsByLyrics(searchTxt);
        res.data = results;
        next();
        
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/getSongsByNameAndLyrics", async (req,res,next) => {
    
    let searchTxtName  = req.query.artist;    
    searchTxtName = searchTxtName.trim();
    let searchTxtLyrics  = req.query.lyrics;    
    searchTxtLyrics = searchTxtLyrics.trim();
    try {
        let results = await getSuggestedSongsByNameAndLyrics(searchTxtName,searchTxtLyrics);
        res.data = results;
        next();
        
    }catch (err) {
        res.status(500).json({ message: err });
    }
});


router.get("/getSongsByArtistAndSort", async (req,res,next) => {
    
    let searchTxtName  = req.query.artist;    
    searchTxtName = searchTxtName.trim();
    let searchTxtNum  = req.query.num;    
    searchTxtNum = searchTxtNum.trim();
    try {
        let results = await getSuggestedSongsByArtistAndSort(searchTxtName,searchTxtNum);
        res.data = results;
        next();
        
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;