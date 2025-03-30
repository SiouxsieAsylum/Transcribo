# Get back into it

## Stack
- React front end
- Node back end 
- Websocket API
- Google STT 

## Spinup
- auth into the service 
    - The authentication information 'gcloud/application_default_credentials' is currently saved in a JSON locally. This will need to be promoted to vault/helm once the application is ready to deploy. 
    - if one does not have a new refresh token, you will get a ` Error: 16 UNAUTHENTICATED: Failed to retrieve auth metadata with error: invalid_grant` error. In order to procure a new one, run `gcloud auth application-default login` and it will generate new local credentials. 
    - The app also has a client secret and a clientId; this may be useful once it's deployed. Need to look further into how to auth once it's a deployed application. 
- run the servers concurrently