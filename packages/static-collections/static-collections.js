// XXX: this is client-side ONLY static collections.
//
// The version in DM is server-side + published with permissions

var SUFFIX = 'md';
var WHERE = 'client';

var ensureCollection = function(compileStep, collectionName) {
  var createCollectionJS = collectionName + " = new Meteor.Collection(null);";
  compileStep.addJavaScript({
    data: createCollectionJS,
    path: 'staticCollections/' + collectionName + '.js',
    sourcePath: compileStep.inputPath
  });
}

var insertDocument = function(compileStep, collectionName, object) {
  var insertJS = collectionName + ".insert(" + EJSON.stringify(object) + ")";
  compileStep.addJavaScript({
    data: insertJS,
    path: compileStep.inputPath.replace(SUFFIX, 'js'),
    sourcePath: compileStep.inputPath
  });
}


var handler = function(compileStep) {
  // ---------- Get collection name  ----------
  var pathArray = compileStep.inputPath.split('/');
  var parts = pathArray.slice(-2); // XXX: can we use path.split?
  var collectionName = parts[0];
  var documentName = parts[1];
  collectionName = collectionName[0].toUpperCase() + collectionName.substring(1);
  
  ensureCollection(compileStep, collectionName);
  
  // ---------- Get file contents ----------
  var contents = compileStep.read().toString('utf8');
  
  insertDocument(compileStep, collectionName, {
    name: documentName,
    contents: contents
  });
  
  //
  // // ---------- Build properties object  ----------
  // var properties = {};
  // var fileName = _.last(compileStep.inputPath);
  // var fileNameArray = fileName.split('-');
  // properties.fileName = fileName
  // properties.slug = fileNameArray.join('-').split('.').shift();
  //
  // // parse YAML frontmatter to build meta properties
  // var myRegexp = /---([\s\S]*?)---/g;
  //
  // if(frontMatter = myRegexp.exec(contents)){
  //   _.each(frontMatter[0].split('\n'), function(item){
  //     if (item == "---" || item == "")
  //       return false;
  //     var itemArray = item.split(':');
  //     var key = itemArray[0].trim();
  //     var property = _.rest(itemArray).join(':').trim();
  //     // if property is an int, parse it as such
  //     property = !!parseFloat(property) ? parseFloat(property) : property;
  //     // if property is a boolean, parse it as such
  //     property = (property == "true") ? true : property;
  //     property = (property == "false") ? false : property;
  //     // strip extra spaces
  //     property = property[0] == " " ? property.slice(1) : property;
  //     properties[key] = property;
  //   });
  // }
  //
  // // once parsing is done, get rid of frontmatter
  // properties.text = contents.replace(/---([\s\S]*?)---/g, '');

}

Plugin.registerSourceHandler(SUFFIX, handler);
