[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

# node-lastfm-scrobblings

Backup your LastFM scrobblings and store them in a ready to be Splunked JSON format file.

### Using the script:

- No previous configuration needed, just clone this repo and use the binary file in any Linux distribution. 
- Execute the binary file with the following parameters:
    ```
    ./bin/index-linux key=<YOUR-API-KEY> user=<LASTFM-USER>
    ```
    - Optionally you can add the 'grade' parameter for setting the parallelization level.
    A grade is the number of chunks that requests will be splitted and performed in parallel. Example: grade=1 launches all the requests in parallel (1 chunk with all data), grade=2 splits the dataset in half and performs two sequential rounds of requests.


### How to build:
Follow these steps if you want to build your own package:

- A Linux executable is generated with `pkg`, so it'd be needed to install it globally:
    ```
    npm install -g pkg
    ```
- Also `Babel` is used to transpile the code from last ES6 features to ES5:
    ```
    npm install -g babel-cli
    ```
- And then install the rest of the dev-dependencies:
    ```
    npm install
    ```
- A bash script for the compilation is included:
    ```
    ./makefile
    ```

## Contributing

Do not hesitate to open issues or make Pull requests.