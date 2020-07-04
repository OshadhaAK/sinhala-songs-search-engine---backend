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
              "analyzer": {
                  "sinhala-ngram": {
                      "type": "custom",
                      "tokenizer": "icu_tokenizer",
                      "char_filter": ["punc_char_filter"],
                      "token_filter": [
                          "edge_n_gram_filter"
                      ]
                  },
                  "sinhala": {
                      "type": "custom",
                      "tokenizer": "icu_tokenizer",
                      "char_filter": ["punc_char_filter"]
                  },
                  "english":{
                      "type": "custom",
                      "tokenizer": "classic",
                      "char_filter": ["punc_char_filter"],
                  },
                  "sinhala-search": {
                      "type": "custom",
                      "tokenizer": "standard",
                      "char_filter": ["punc_char_filter"]
                  },
              },
              "char_filter": {
                  "punc_char_filter": {
                      "type": "mapping",
                      "mappings": [".=>", "|=>", "-=>", "_=>", "'=>", "/=>", ",=>", "?=>"]
                  }
              },
              "token_filter": {
                  "edge_n_gram_filter": {
                      "type": "edge_ngram",
                      "min_gram": "2",
                      "max_gram": "20",
                      "side": "front"
                  }
              }
          }
      },
      "mappings": {
          "properties": {
              "id": {
                  "type": "long"
              },
              "song": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
                  "analyzer": "sinhala-ngram",
                  "search_analyzer": "sinhala-search"
              },
              "artist": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
                  "analyzer": "sinhala-ngram",
                  "search_analyzer": "sinhala-search"
              },
              "genre": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
                  "analyzer": "sinhala-ngram",
                  "search_analyzer": "sinhala-search"
              },
              "writer": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
                  "analyzer": "sinhala-ngram",
                  "search_analyzer": "sinhala-search"
              },
              "music": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
                  "analyzer": "sinhala-ngram",
                  "search_analyzer": "sinhala-search"
              },
              "guitarKey": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
              },
              "postedBy": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
              },
              "lyrics": {
                  "type": "text",
                  "fields": {
                          "keyword": {
                              "type": "keyword",
                              "ignore_above": 256
                          },
                  },
                  "analyzer": "sinhala",
                  "search_analyzer": "sinhala-search"
              },
              "visits": {
                  "type": "long"
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

// const insertData = async (searchTxt) => {
//     console.log(searchTxt)
//     let queryClause = {
//         "type": "line",
//         "line_id": 111381,
//         "play_name": "A Winters Tale",
//         "speech_number": 38,
//         "line_number": "5.3.169",
//         "speaker": "LEONTES",
//         "text_entry": "A prayer upon her grave. Ill not seek far--"
        
//     }

//     let reqObject = {
//         url:"http://localhost:9200/"+searchTxt+"/_bulk?pretty",
//         headers: 'Content-Type: application/x-ndjson'
//     };

//     let results = {}

//     try{
//         results = await hitElastic(reqObject);
//         console.log("results:",results)
//     }catch(e){
//         results = {
//             error : e
//         }
//     }

//     return results;
// };

exports.createIndex = createIndex;
// exports.insertData = insertData;