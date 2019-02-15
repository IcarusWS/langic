/*!
 * langic.js v1.0.0
 * @copyright 2019 Icarus, Inc.
 */

// This script uses ES6 code at some instances. If you want to use the fully supported ES5 script, try using langic.old.js

/* langic object */
var langic = {};

// this proporty object contains the latest stored version of all languages
langic.latest = {};

// this method will change the language of a page
langic.setLanguage = async function(language)
{
    var path = 'languages/' + language + '.lang.json';
    var data = await __.languageFileRequest(path);
    data.json().then(function(j){
        __.applyLanguage(j);
    })
}

// this method will load a new version of the language file and return it, so it can be used for the setKeyJSON function

langic.load = async function(language)
{ 
    return await __.loadMem(language);
}

// this method will apply the language change to only one object, from a JSON object formatted according to the lang.json guidelines
langic.setKey = async function(key, language)
{
    if(!langic.latest[language])
    {
        await __.loadMem(language);
    }
    return __.changeElement(key, langic.latest[language][key]);
}


// utility namespace: __
var __ = {};

__.languageFileRequest = function(file)
{
    // ES6 Promise & fetch code
    return new Promise(resolve => {
        fetch(file).then(data => {
            resolve(data);
        })
    });
}

// Apply the language to all objects
__.applyLanguage = function(j)
{
    for(var i = 0; i < Object.keys(j).length; i++)
    {
        var key = Object.keys(j)[i];
        var value = j[key];
        __.changeElement(key, value);
    }
    return null;
}

// Change an element
__.changeElement = function(key, value)
{
    // Set the object, referenced by the key, to the value
    document.getElementById(key).textContent = value;
}

// Loads a language from JSON, and stores it under langic->latest->language
// returns true
__.loadMem = async function(language)
{
    return new Promise(async (resolve) => {
        // Get the json file
        var path = 'languages/' + language + '.lang.json';
        var data = await __.languageFileRequest(path);

        // Parse the json
        data.json().then(function(j){
            langic.latest[language] = j;
            resolve(true);
        });
    })
}

