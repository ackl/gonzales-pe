(function() {
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var settings = document.getElementById('settings');

  var syntax = 'css';
  var format = 'full';

  function handleInput() {
    var css = input.value;
    var parseTree = {};
    try {
      parseTree = gonzales.parse(css, {syntax: syntax});
    } catch(e) {
    }
    printTree(parseTree);
  }

  function handleSettingsChange(event) {
    var target = event.target;
    var name = target.name;

    if (name === 'syntax') {
      syntax = target.value;
      handleInput();
    }

    if (name === 'format') {
      format = target.value;
      handleInput();
    }
  }

  function printTree(parseTree) {
    if (!parseTree.toJson) {
      output.value = '{}';
    } else if (format === 'full') {
      output.value = parseTree.toJson();
    } else if (format === 'short') {
      var whitelist = ['type', 'content'];
      output.value = JSON.stringify(parseTree, whitelist, 2);
    } else if (format === 'simple') {
      var tree = [];
      parseTree.traverse(function(node, i, parent, lastLevel) {
          var type = node.type;
          var spaces = new Array(lastLevel).join(' |');
          if (typeof node.content === 'string') {
              var content = JSON.stringify(node.content);
              tree.push(spaces + ' -> ' + type);
              tree.push(spaces +  '    ' + content);
          } else {
              tree.push(spaces + ' -> ' + type);
          }
      });
      output.value = tree.join('\n');
    }
  }

  input.addEventListener('input', handleInput);
  settings.addEventListener('change', handleSettingsChange);
})();