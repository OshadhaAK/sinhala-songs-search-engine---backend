const request = require('request');



const hitElastic = (options) => {
    console.log(JSON.stringify("++++++++++++++++++++++++++++++"+options.json));
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

const createIndex = async (searchTxt) => {

    let queryClause = {
        
            "settings": {
              "analysis": {
                "filter": {
                  "autocomplete_filter": {
                    "type": "edge_ngram",
                    "min_gram": "1",
                    "max_gram": "40"
                  }
                },
                "analyzer": {
                  "pk_custom_analyzer": {
                    "type":      "custom", 
                    "tokenizer": "standard",
                    "char_filter": [
                      "html_strip"
                    ],
                    "filter": [
                      "lowercase"
                    ]
                  },
                  "autocomplete": {
                    "filter": ["lowercase", "autocomplete_filter"],
                    "type": "custom",
                    "tokenizer": "whitespace"
                  }
                }
              }
            },
            "mappings": {
              "properties": {
                "speaker": {
                  "type": "keyword"
                },
                "play_name": {
                  "type": "text",
                  "analyzer": "pk_custom_analyzer"
                },
                "line_id": {
                  "type": "integer"
                },
                "speech_number": {
                  "type": "integer"
                },
                "line_number": {
                  "type": "keyword"
                },
                "text_entry": {
                  "type": "text",
                  "analyzer": "autocomplete"
                }
              }
            }
          
        

    }

    let reqObject = {
        url:"http://localhost:9200/"+searchTxt,
        json:queryClause
    };
    console.log("url:",reqObject.url)
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

const insertData = async (searchTxt) => {
    console.log(searchTxt)
    let queryClause = {
        "type": "line",
        "line_id": 111381,
        "play_name": "A Winters Tale",
        "speech_number": 38,
        "line_number": "5.3.169",
        "speaker": "LEONTES",
        "text_entry": "A prayer upon her grave. Ill not seek far--"
        
    }

    let reqObject = {
        url:"http://localhost:9200/"+searchTxt+"/_bulk?pretty",
        headers: 'Content-Type: application/x-ndjson'
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e,
            message: "sfawv"
        }
    }

    return results;
};

exports.createIndex = createIndex;
exports.insertData = insertData;