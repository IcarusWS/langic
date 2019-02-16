# Langic

Langic is a website language manager using the AJAX principle

  - Change the complete language of a page
  - Change specific objects on the page

### Changes (Version 1.1.0)
+ Added langic.setPath() (Sets the language directory)
+ Migrated all the utility methods to langic.util
+ Removed langic.load()

### Installation

Langic requires browsers with ES6 support to run.

Clone the repository from [Github](https://github.com/IcarusWS/langic)

##### Configure
1. Place the _langic.js_ file into your scripts folder
2. Create a directory called "languages" in the same directory as your HTML files (You can change the path with ```langic.setPath([path])```)
3. In the languages folder, place your [language].lang.json files

### How to format your language
Langic files are based on JSON, and require a precise syntax. The entire file consists of Keys and Values, as formatted below:

```json
{
    "[KEY]": "[VALUE]",
    "[KEY]": "[VALUE]"
}
```
The key needs to conform to the ID of an HTML element. For example, say we have the ```<span id="title"></span>``` element.
Now we want to add language support to that span. To achieve this is quite simple, just add the key "title" with the value of the text in the element (beware that Langic will remove all text currently inside set element, so use spans and divs to avoid problems). The result is:

```json
{
    "title": "Welcome to our website!"
}
```
When you change the language of the page to this language, the span with id="title" will have "Welcome to our website" as its content.

Save language files as [language_name].lang.json in the languages folder (see Installation)

### How to use langic.js (Documentation)
All langic functionality is stored in the _langic_ object. 

##### Change the language of an entire page
To change the language of an entire page, use the langic.setLanguage([language]) method, where the language parameter is the language, according to the name of the [language].lang.json file. In this example the file you are requesting is called _english.lang.json_ and is stored in the languages folder.
```javascript
    langic.setLanguage('english');
```

##### Load a language without applying it
_This is now deprecated (V 1.1.0)_

##### Change the language for a specific element (where the ID conforms to the key)
To change the language of a specific element, use the langic.setKey([key], [language]), where the [key] parameter is the id of an HTML element AND the key to a language string (they need to be the same), and the language parameter is the language, according to the name of the [language].lang.json file.

If the language is not yet loaded using langic.load(), then this method will load a new version.

Example:
```javascript
langic.setKey('title', 'english');
```

##### Change the language directory path
To change the path of the languages directory, use _langic.setPath([path]).enable()_, where [path] is the path of the directory
For example, say we have a website where the languages are stored in the http://www.example.com/files/languages folder:

```javascript
langic.setPath('/files/languages/');
```

### Todos

 - Add a ES5 version using XMLHTTP

License
----
Apache 2.0
