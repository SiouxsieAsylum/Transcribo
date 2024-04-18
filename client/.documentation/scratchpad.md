===================================

## Current TO-DOs
- Finish Docker setup and ensure application runs
    - [kubernates](https://docs.docker.com/build/drivers/kubernetes/)
    - [alpine]()
    - [node:alpine](https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine)
        - I need to have node in the container as my app runs on it
        - it should run both package.json
        - does it need [sox](https://linux.die.net/man/1/sox)
            - sox seems to be for reading already existing files
            - what do I need to expose for it to attach to a user's microphone?
    - need to pull the image first (add to readme)
- Add modal and button to refresh page if websocket closes
    - Material UI?
- Speed up the connection to google somehow? Is the time the actual transcription or my processing of the stream?
    
====================================
## Env Problems that need solving: 
- Using Node 18+ causes `digital envelope routines::unsupported` error
    - "worked around" by:
        - running `export NODE_OPTIONS=--openssl-legacy-provider` <----  works for now
        - downgrading NODE
        - https://stackoverflow.com/a/73027407 <--- actual fix for post-localhost?
- Using Webpack 5 is causing issues for version of React-Scripts, which requires webpack 4
    - deleting package.json and reinstalling does not work
    - created .env and added `SKIP_PREFLIGHT_CHECK=true` to it
    - will likely need to downgrade webpack
- No script for installing and running both sets of packages, or killing both servers, or refreshing both servers.
    - both servers run with `concurrently`; need to decide if I should bring in `nodemon`
    - https://stackoverflow.com/questions/43415506/how-to-make-a-refresh-in-browser-with-gulp
    - https://github.com/gulp-community/gulp-livereload
    - https://github.com/intesso/connect-livereload

## Functionality problems that need solving
- `Reached transcription time limit, press Ctrl+C`
- ~~Many transcripts come through, only need one and the most faithful one~~ **Handled by removing React.StrictMode**
- ~~Websocket keeps collapsing and reestablishing~~ **Solved by memoizing the websocket component**

## Next Steps in development
### Server
- connection timeout handler
- Taking commands
- Speech diarization
- User auth and session info
- MongoDB hookup
    - save results and sent transcript 
    - save user session info
- logging 
- Different services
    - AWS
    - Open AI
    - ???
    - Configurability btwn all of them
- Set up a script to restart browser when api updates
- Set up docker container to make installation easy
    - env
        - linux
        - sox
    - whtever kubernates does
- Secrets management

### Client
- Flow chart
    - Lines
    - Forks
    - Box
- Timeline
- Chosen Path
- User Auth
- popup for when connections close
- saving data for when connections are refreshed
    - user session saved? connectionId saved as cookie?
- button to refresh page when connection is closed


## Documentation that needs doing
- Actual detailed install instructions

## Random refactors
- camelcase the configs'





