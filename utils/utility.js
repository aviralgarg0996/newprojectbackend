


// google api vars
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;

var drive = google.drive({ version: 'v3', auth: oauth2Client });
var oauth2Client = new OAuth2(
  'AIzaSyBkqALVkaDOWqZQ-JuGlV7IBUg2A6RX5oM',
  '"RnEmP9xJcr08y_RVkRW6JGwk"',
  'urn:ietf:wg:oauth:2.0:oob'
);
var SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/spreadsheets' ];
var TOKEN_DIR =   './credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';


exports.uploadSheetOnDrive = (data, callback) => {
    
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  authorize(JSON.parse(content), createFile);
});


function authorize(credentials, callback) {
  console.log('console 2');
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  fs.readFile(TOKEN_PATH, function(err, token) {
    console.log('console 3');
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      console.log('console 4');
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:true,
  });

  rl.question('Enter the code from that page here: ', function(code) {
      console.log('in code function', code)
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        oauth2Client.setCredentials(tokens);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  console.log('token----', token)
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


   createFile =(auth)=> {
      console.log('in create file');
      if(true){
           fx1(auth,data,(err,cb1)=>{
           callback(null,cb1)
       })    
        }
        else{
            fx2(auth,data,(err,cb1)=>{
                callback(null,cb1)
            })   
        }
}
}


fx1=(auth,data,callback)=>{
    let folder_id='';
    var fileId = ''
     var folderMetadata = {
       'name': data.folderName,
       'mimeType': 'application/vnd.google-apps.folder',
       parents: ['1tQJe9ygVGcHoY0OpaUKV3IOxhwrNzfaU']
       };
   drive.files.create({
     resource: folderMetadata,
     fields: 'id',
     auth: auth,
    
   }, function (err, file)   {
     console.log('called')
     if (err) {
       console.error('error',err);
     } else {
    folder_id=file.id;
       console.log('Folder Id: ', file);


       var fileMetadata = {
         'name': data.fileName+'.xlsx',
          parents: [folder_id],
          mimeType: 'application/vnd.google-apps.spreadsheet',
       };
       var media = {
         mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         body: fs.createReadStream('./file.xlsx')
       };
       drive.files.create({
         resource: fileMetadata,
          media: media,
         fields: 'id',
         auth: auth,
       }, function (err, file) {
         console.log('called123');
         if (err) {
           console.error('error',err);
         } else {
           console.log('File Id: ', file);
            fileId = file.id;
            var fileId = file.id;
        //     var dest = fs.createWriteStream('./spredsheet.xlsx');
        //     drive.files.export({
        //     fileId: fileId,
        //     mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //     auth:auth
        //   })
        //   .on('end', function () {
        //     console.log('Done');
        //   })
        //   .on('error', function (err) {
        //     console.log('Error during download', err);
        //   })
        //   .pipe(dest);
        //    let obj={folder_id:folder_id,fileId:fileId,fx:"fx1"}
           callback(null,obj)
        }
      });
     }
  });}


  fx2=(auth,data,callback)=>{
    let folder_id='';
    var fileId = ''
     var fileMetadata = {
       'name': data.folderName,
       'mimeType': 'application/vnd.google-apps.folder',
       parents: ['1tQJe9ygVGcHoY0OpaUKV3IOxhwrNzfaU']
       };
   drive.files.create({
     resource: fileMetadata,
     fields: 'id',
     auth: auth,
    
   }, function (err, file)   {
     console.log('called')
     if (err) {
       console.error('error',err);
     } else {
    folder_id=file.id;
       console.log('Folder Id: ', file);


       var fileMetadata = {
         'name': data.fileName+'.xlsx',
          parents: [folder_id],
          mimeType: 'application/vnd.google-apps.spreadsheet',
       };
       var media = {
         mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         body: fs.createReadStream('./file.xlsx')
       };
       drive.files.create({
         resource: fileMetadata,
          media: media,
         fields: 'id',
         auth: auth,
       }, function (err, file) {
         console.log('called123');
         if (err) {
           console.error('error',err);
         } else {
           console.log('File Id: ', file);
            fileId = file.id;
           let obj={folder_id:folder_id,fileId:fileId,fx:"fx2"}
           callback(null,obj)
        }
      });
     }
  });}


