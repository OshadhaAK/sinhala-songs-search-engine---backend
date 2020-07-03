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

