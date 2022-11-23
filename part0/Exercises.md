# Exercises

## 0.4 Sequence diagram for a standard HTML POST request
```mermaid
sequenceDiagram
    Note over browser: user enters text and clicks submit button on form

    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: HTTP status code 302 (URL redirect to notes)
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: HTML content
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: main.css
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: main.js

    Note over browser: browser starts executing js-code that requests JSON data from server

    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

    Note over browser: browser executes the event handler that renders notes to display
```

## 0.5 Sequence diagram when navigating to the single page application (SPA)
```mermaid
sequenceDiagram
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: HTML content
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: main.css  
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: spa.js

    Note over browser: browser starts executing js-code that requests JSON data from server

    browser->>server: HTTP GET single-file-hooks-frames.js, axe.js, etc. (additional libraries)
    server-->>browser: libraries

    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

    Note over browser: browser executes the event handler that renders notes to display
```

## 0.6 Sequence diagram for the single page application (SPA) HTML POST request
```mermaid
sequenceDiagram
    Note over browser: user enters text and clicks submit button on form
    Note over browser: JSON created from input and current datetimestamp, and request initiated, using JS

    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (header is 'application/json')
    server-->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...] and HTTP status code 201 (created)

    Note over browser: browser executes the event handler that renders notes to display
```