const request = require('request');


const hitElastic = (options) => {
    console.log(JSON.stringify(options));
    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error || response.statusCode != 200) {
                console.log("error:",error)
                reject(new Error('Some Error Occurred'));
            } else {
                resolve(body.hits);
            }
        });
    });
};

const getSuggestedSongsByArtist = async (searchTxt) => {
    
    let queryClause = {
        "query" : {
            "match_phrase":{
                "mainArtist" : searchTxt
            }
        }
    }

    let reqObject = {
        url:"http://localhost:9200/songs/_search?pretty",
        json:queryClause
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e
        }
    }

    return results;
};

const getSuggestedSongsByName = async (searchTxt) => {
    console.log(searchTxt)
    let queryClause = {
        "query" : {
            "match_phrase":{
                "song" : searchTxt
            }
        }
    }

    let reqObject = {
        url:"http://localhost:9200/songs/_search?pretty",
        json:queryClause
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e
        }
    }

    return results;
};

const getSuggestedSongsByLyrics = async (searchTxt) => {
    console.log(searchTxt)
    let queryClause = {
        "query" : {
            "multi_match":{
                "query": searchTxt,
                "fuzziness": "AUTO",
                "fields": [ "lyrics"],
                "operator": "AND"
            }
        }
    }

    let reqObject = {
        url:"http://localhost:9200/lyricalsongs/_search",
        json:queryClause
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e
        }
    }

    return results;
};

const getSuggestedSongsByNameAndLyrics = async (searchTxtName,searchTxtLyrics) => {
    console.log(searchTxtName,searchTxtLyrics)
    let queryClause = {
        "query": {
            "bool": {
              "must": [
                {
                  "multi_match": {
                    "query": searchTxtLyrics,
                    "fuzziness": "AUTO",
                    "fields": [
                      "lyrics"
                    ],
                    "operator": "AND"
                  }
                },
                {
                  "multi_match": {
                    "query":searchTxtName, 
                    "fuzziness": "AUTO",
                    "fields": [
                      "artist"
                    ],
                    "operator": "or"
                  }
                }
              ]
            }
          }
    }

    let reqObject = {
        url:"http://localhost:9200/lyricalsongs/_search",
        json:queryClause
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e
        }
    }

    return results;
};

const getSuggestedSongsByArtistAndSort = async (searchTxtName,searchTxtNum) => {
    console.log(searchTxtName,searchTxtNum)
    let queryClause = {
        "query": {
            "multi_match": {
                "query":searchTxtName, 
                "fuzziness": "AUTO",
                "fields": ["artist"],
                  "operator": "or"
            }
        },
        "collapse": {
            "field": "artist",
            "size" : searchTxtNum
        },
        "sort": ["visits"]
    }

    let reqObject = {
        url:"http://localhost:9200/lyricalsongs/_search",
        json:queryClause
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e
        }
    }

    return results;
};


exports.getSuggestedSongsByArtist = getSuggestedSongsByArtist;
exports.getSuggestedSongsByName = getSuggestedSongsByName;
exports.getSuggestedSongsByLyrics = getSuggestedSongsByLyrics;
exports.getSuggestedSongsByNameAndLyrics = getSuggestedSongsByNameAndLyrics;
exports.getSuggestedSongsByArtistAndSort = getSuggestedSongsByArtistAndSort;
