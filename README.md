[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

# node-lastfm-scrobblings

Backup your LastFM scrobblings and store them in a friendly JSON format file.

### Using the script:

- No previous configuration needed, just clone this repo and use the binary file on any Linux distribution. 
- Execute the binary file with the following parameters:
    ```
    ./bin/index-linux key=<YOUR-API-KEY> user=<LASTFM-USER> start=<start-page> end=<end-page> grade=<concurrency-grade>
    ```
    - `key (Mandatory)`: The API KEY provided by LastFM.
    - `user (Mandatory)`: The user to grab the data from.
    - `start (Optional`: The API page to start. By default, the first page.
    - `end (Optional`: The API page to end pagination. By default, the last page.
    - `grade (Optional)`: The 'grade' parameter for setting the concurrency level. A grade is the number of chunks that requests will be splitted and performed in parallel. Example: grade=1 launches all the requests in parallel (1 chunk with all data), grade=2 splits the dataset in half and performs two sequential rounds of requests.

### How to build:
Follow these steps if you want to build your own package:

- A Linux executable will be generated with `pkg`, so it'd be needed to install it globally:
    ```
    npm install -g pkg
    ```
- Also `Babel` is used for transpiling the code from latest ES6 features to ES5:
    ```
    npm install -g babel-cli
    ```
- Then install the rest of the dev-dependencies:
    ```
    npm install
    ```
- Run the attached bash script for building the binaries:
    ```
    ./makefile
    ```

## Contributing

Do not hesitate to open issues or make Pull requests.