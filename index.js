const fs = require('fs')
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
let ID = 0;
function createAsset(filename){
  const content = fs.readFileSync(filename,'utf-8');
  const ast = babylon.parse(content,{
    sourceType:'module'
  })
  const dependies = [];
  traverse(ast,{
    ImportDeclaration:({node})=>{
      dependies.push(node.source.value);
    }
  })
  const id = ID++;
  return {
    id,
    filename,
    dependies
  }
}
const mainAsset = createAsset('./entry.js');
console.log(mainAsset);