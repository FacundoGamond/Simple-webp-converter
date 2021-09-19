const webp = require('webp-converter');
const fs = require('fs');

// this will grant 755 permission to webp executables
webp.grant_permission();

//Fundamental directorys.
const inputPath = './uploads/';
const outputPath = './webp-uploads/';


const dirTree = require("directory-tree");
const tree = dirTree(inputPath, {}, null, (item, PATH, stats) => {

    let pathTree = '';
    item.path.split('/').forEach((path, key) => {
        pathTree += path + '/';
        if (!fs.existsSync(outputPath + pathTree)) {
            fs.mkdirSync(outputPath + pathTree);
        }
    });

    item.children.forEach(child => {

        if (child.path.indexOf('.') != -1) {

            const result = webp.cwebp(child.path, outputPath + child.path.split('./uploads/') + ".webp", "-q 80", logging = "-v");
            result.then((response) => {
                //console.log(response);
            });
        }

    })

});