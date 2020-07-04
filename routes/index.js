const express = require("express");
const router = express.Router();
const { createIndex, insertData } = require ('../Services/IndexService')

router.get("/", async (req,res) => {
    try {
        res.send('index!')
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

router.put("/indices", async (req, res, next) => {
    
    let searchTxt = req.query.index;
    
    searchTxt = searchTxt.trim();
    console.log("induces")
    try {
        let results = await createIndex(searchTxt);
        res.data = results;
        next();
        res.status(200).json({message: searchTxt})
        
    }catch (err) {
        res.status(500).json({ message: "jjjjjjjj" });
    }
});

// router.post("/insert", async (req, res, next) => {
//     let searchTxt = req.query.index;
//     searchTxt = searchTxt.trim();
    
//     try {
//         let results = await insertData(searchTxt);
//         res.data = results;
       
//         next();
//         res.status(200).json({message: searchTxt})
        
//     }catch (err) {
//         res.status(500).json({ message: err });
//     }

// });


module.exports = router;