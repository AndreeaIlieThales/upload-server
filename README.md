This server is created in order to add a simple functionality of uploading and saving a file to a local folder for front end apps.
The server runs on port 4000, has the host : `http://localhost:6006` in its whitelist, and can be started running `npm start`.
The route available for upload is `\upload`;
The route handler expects a payload of type Form Data, with a field called 'file', for file data, and a field called name, for the file name.
It will respond with a response body of { code: <error | success code>, message: <response text>}


