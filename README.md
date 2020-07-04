# sinhala-songs-search-engine---backend

## Quick Start

1. Start Elasticsearch
2. Start backend - **npm start**
3. Create the index by calling the endpoint 
*     http://localhost:8080/index/indices?index=indexName
4. call below end points to search
    * http://localhost:8080/search/getSongsByLyrics?lyrics=කැන් සුවඳ දේ ගල් කණුවල පිපුණු
    * http://localhost:8080/search/getSongsByNameAndLyrics?artist=ජයන්ත රත්නායක ගැයූ ගී&lyrics=සිහින් සරින් තව විටෙන ළය නිවයි
    * http://localhost:8080/search/getSongsByName?song=මල් මුතු දා මේ
    * http://localhost:8080/search/getSongsByArtist?artist=විජය කුමාරතුංග
    *  http://localhost:8080/search/getSongsByArtistAndSort?artist=විජය කුමාරතුංග&num=10


## Lyrics and Metadata

* Song
* Artist
* Genre
* Lyrics
* Music
* Number of visits
* Posted by
* Guitar key
* Writer

## Data

* Original data - songsCorpus.csv in **Scraping git repo**
* Processed data - processedsongs.csv **Scraping git repo**

## Main Usecases
* Search by songs name/ artist name/ lyrics etc
* Multi Search
* Sorted Range Queries
* Filtering search results based on keywords (faceted search)

## Indexing techniques
Elasticsearch analysers were used

## Scraping git repo
* https://github.com/OshadhaAK/Scrapy.git

