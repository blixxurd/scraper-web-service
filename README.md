# Scraper Web Service
Barebones starter app that scrapes a website, and outputs scraped data in JSON format. 

## Installation
Clone/Download and run
```
npm install
```

## Running
Once installed, you can start the server with the command:
```
node server
```

## Accessing API
You can view your crawler at http://localhost:8081/

URLs are passed in through URL params. To crawl CNN.com for example, you'd hit the url:

```
http://localhost:8081/?url=http://cnn.com/
```
