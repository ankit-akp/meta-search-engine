from bs4 import BeautifulSoup
import requests as req
from flask import jsonify
def PubmedSearch(query):
    results=[]
    for i in range(1,3):
        res=req.get(f'https://pubmed.ncbi.nlm.nih.gov/?term={query}&page={i}')
        data=BeautifulSoup(res.text,'html.parser')
        all_data=data.select('.search-results-chunks .results-chunk article')
        base='https://pubmed.ncbi.nlm.nih.gov'
        for i in all_data:
            url=base+i.select('a')[0].get('href')
            t=i.select('a')[0].strings
            title=''
            for e in t:
                title+=e.strip()
            d=i.select('.docsum-citation')[0].strings
            author=i.select('.docsum-authors.full-authors')[0].string
            citation=i.select('.docsum-journal-citation.full-journal-citation')[0].string
            pmid=i.select('.docsum-pmid')[0].string

            text=f'author: {author.strip()}, citation: {citation}, PMID: {pmid}'
            
            ## Keyword count
            words=query.split()
            wordcount={}
            total=0
            for w in words:
                wordcount[w]=0

            res=req.get(url,verify=False)
            for w in words:
                wordcount[w]+=res.text.count(w)
                total+=res.text.count(w)
                
            results.append({'url':url,'title':title,'text':text,'wordcount':wordcount,'total':total})

    return jsonify({'results':results, "engine": "pubmed"})