// config/database.js
module.exports = {
    'url': 'mongodb+srv://demo:demo@cluster0.q2ojb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    'dbName': 'demo'
}
// Put this in gitignore, so others can't see db credentials
// When using own database in savage-auth projects, make sure to add name of db before '?' in 'url'