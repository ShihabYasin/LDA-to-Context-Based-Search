# LDA-to-Context-Based-Search
--------
Context Based Search Using LDA Topic Modelling Algorithm

LDA is a machine learning algorithm that extracts topics and their related keywords from a collection of documents. Using these information about different documents it is possible to do context based file searching according their relevance with search keyword or document classification based on their context.

In LDA, a document may contain several different topics, each with their own related terms. The algorithm uses a probabilistic model for detecting the number of topics specified and extracting their related keywords. For example, a document may contain topics that could be classified as beach-related and weather-related. The beach topic may contain related words, such as sand, ocean, and water. Similarly, the weather topic may contain related words, such as sun, temperature, and clouds.

See http://en.wikipedia.org/wiki/Latent_Dirichlet_allocation

## Usage
1) run t.js node file.
Install all required node libraries if already not installed
(port 8081 is used, you may use different one)
Give Command like:
```bash
$ node t.js
```
2) run t.html on browser like firefox
3) Get some hint to search. Hit SEARCH HINT button.
4) Then search using different keywords. Give one word to search for.
5) Based on your search key you will see different file listing according to 
their relevance with that search key in descending order.
6) You may try with adding different text files containing different articles
in DOCUMENTstorage folder.

## Output
![alt text](https://github.com/ShihabYasin/LDA-to-Context-Based-Search/blob/master/Capture.PNG)
