//-------------------------------------//
//-- Jquery to javascript converter --//
function convertJqueryToJS(jqueryCode) {
  // Replace $ with document.querySelector
  jqueryCode = jqueryCode.replace(/\$\(/g, 'document.querySelector(');

  // Replace .text with .innerText
  jqueryCode = jqueryCode.replace(/\.text\((.*?)\)/g, ".innerText = $1");
 
  // Replace .html with .innerHTML
  jqueryCode = jqueryCode.replace(/\.html\((.*?)\)/g, ".innerHTML = $1");

  // Replace .val with .value
  jqueryCode = jqueryCode.replace(/\.val\(/g, '.value =');

  // Replace .click with .addEventListener("click", function()
  jqueryCode = jqueryCode.replace(/\.click\(/g, '.addEventListener("click", function(');

  // Replace .append with .insertAdjacentHTML("beforeend",
  jqueryCode = jqueryCode.replace(/\.append\(/g, '.insertAdjacentHTML("beforeend",');

  // Replace .prepend with .insertAdjacentHTML("afterbegin",
  jqueryCode = jqueryCode.replace(/\.prepend\(/g, '.insertAdjacentHTML("afterbegin",');

  // Replace .hide with .style.display = "none";
  jqueryCode = jqueryCode.replace(/\.hide\(\)/g, '.style.display = "none";');

  // Replace .show with .style.display = "block";
  jqueryCode = jqueryCode.replace(/\.show\(\)/g, '.style.display = "block";');

  // Replace .fadeIn with .style.display = "block"; and add transition effect
  jqueryCode = jqueryCode.replace(/\.fadeIn\(/g, '.style.display = "block";\n' +
    '  setTimeout(function () {\n' +
    '    this.style.transition = "opacity 0.5s ease-in-out";\n' +
    '    this.style.opacity = 1;\n' +
    '  }.bind(this), 20);');

  // Replace .fadeOut with .style.display = "none"; and add transition effect
  jqueryCode = jqueryCode.replace(/\.fadeOut\(/g, '.style.opacity = 0;\n' +
    '  setTimeout(function () {\n' +
    '    this.style.display = "none";\n' +
    '  }.bind(this), 500);');

  // Replace .addClass with .classList.add
  jqueryCode = jqueryCode.replace(/\.addClass\(/g, '.classList.add(');

  // Replace .removeClass with .classList.remove
  jqueryCode = jqueryCode.replace(/\.removeClass\(/g, '.classList.remove(');

  // Replace .toggleClass with .classList.toggle
  jqueryCode = jqueryCode.replace(/\.toggleClass\(/g, '.classList.toggle(');

  // Replace .attr with .getAttribute
  jqueryCode = jqueryCode.replace(/\.attr\(/g, '.getAttribute(');

  // Replace .attr with .setAttribute
  jqueryCode = jqueryCode.replace(/\.attr\(\s*['"](\w+)['"],\s*['"](.*)['"]\s*\)/g,
    (match, p1, p2) => {
      return '.setAttribute("' + p1 + '", "' + p2 + '");';
    });

  // Replace .css with .style
  jqueryCode = jqueryCode.replace(/\.css\(/g, '.style.');

  // Replace .each with forEach
  jqueryCode = jqueryCode.replace(/\.each\(/g, '.forEach(');

  // Replace .on with addEventListener
  jqueryCode = jqueryCode.replace(/\.on\(/g, '.addEventListener(');

  // Replace .ready with window.addEventListener("load",
  jqueryCode = jqueryCode.replace(/\$\(document\)\.ready\(/g, 'window.addEventListener("load",');
  
  // Replace .append with .innerHTML +=
  jqueryCode = jqueryCode.replace(/\.append\(/g, '.innerHTML += ');

  // Replace .addClass with classList.add
  jqueryCode = jqueryCode.replace(/\.addClass\(/g, '.classList.add(');

  // Replace .removeClass with classList.remove
  jqueryCode = jqueryCode.replace(/\.removeClass\(/g, '.classList.remove(');

  // Replace .toggleClass with classList.toggle
  jqueryCode = jqueryCode.replace(/\.toggleClass\(/g, '.classList.toggle(');

  // Replace .fadeIn with classList.add and opacity transition
  jqueryCode = jqueryCode.replace(/\.fadeIn\(/g, (match) => {
    return '.style.transition = "opacity 0.5s", .style.opacity = "1", .style.display = "", ';
  });

  // Replace .fadeOut with classList.add and opacity transition
  jqueryCode = jqueryCode.replace(/\.fadeOut\(/g, (match) => {
    return '.style.transition = "opacity 0.5s", .style.opacity = "0", setTimeout(() => {.style.display = "none";}, 500), ';
  });

  // Replace .hide with style.display = "none"
  jqueryCode = jqueryCode.replace(/\.hide\(/g, '.style.display = "none",');

  // Replace .show with style.display = ""
  jqueryCode = jqueryCode.replace(/\.show\(/g, '.style.display = "",');

  // Replace .slideDown with height transition
  jqueryCode = jqueryCode.replace(/\.slideDown\(/g, (match) => {
    return '.style.display = "", .style.height = "0", .style.transition = "height 0.5s", setTimeout(() => {.style.height = "";}, 0), ';
  });

  // Replace .slideUp with height transition
  jqueryCode = jqueryCode.replace(/\.slideUp\(/g, (match) => {
    return '.style.height = "", .style.transition = "height 0.5s", setTimeout(() => {.style.display = "none", .style.height = "0";}, 500), ';
  });

  // Replace .slideToggle with height transition
  jqueryCode = jqueryCode.replace(/\.slideToggle\(/g, (match) => {
    return '.style.height === "0" || .style.display === "none" ? .style.display = "", .style.height = "0", .style.transition = "height 0.5s", setTimeout(() => {.style.height = "";}, 0) : .style.height = "", .style.transition = "height 0.5s", setTimeout(() => {.style.display = "none", .style.height = "0";}, 500), ';
  });

  // Replace .delay with setTimeout
  jqueryCode = jqueryCode.replace(/\.delay\(([^\)]+)\)/g, (match, p1) => {
    return 'setTimeout(() => {}, ' + p1 + '),';
  });

  return jqueryCode;
}
//-------------------------------------//

// ** Format Javascript code ** //
const beautify = (code) => {
  let beautifiedCode = '';
  let indentationLevel = 0;
  let inString = false;
  let currentChar;
  let previousChar;

  for (let i = 0; i < code.length; i++) {
    currentChar = code[i];
    previousChar = code[i - 1];

    if (currentChar === '{' && !inString) {
      beautifiedCode += currentChar + '\n';
      indentationLevel++;
      beautifiedCode += ' '.repeat(indentationLevel * 2);
    } else if (currentChar === '}' && !inString) {
      beautifiedCode = beautifiedCode.trimRight();
      beautifiedCode += '\n';
      indentationLevel--;
      beautifiedCode += ' '.repeat(indentationLevel * 2);
      beautifiedCode += currentChar + '\n';
      beautifiedCode += ' '.repeat(indentationLevel * 2);
    } else if (currentChar === '"' && previousChar !== '\\') {
      inString = !inString;
      beautifiedCode += currentChar;
    } else {
      beautifiedCode += currentChar;
    }
  }

  return beautifiedCode.trim();
};

// Target all elements
var jquerybox = document.querySelector('#jquery-code');
var javascript = document.querySelector('#js-code');

// Convert on input in jquery textarea 
jquerybox.addEventListener("input", function() {
  var jqueryCode = jquerybox.value;
  var jsCode = convertJqueryToJS(jqueryCode);
  const beautifiedCode = beautify(jsCode);
  javascript.innerText = beautifiedCode;

  javascript.style.color = "#1E2235";
});

// clear all Jquery and javascript code
function cleartext() {
  jquerybox.value = '';
  javascript.innerText = 'Get Javascript Code Here';
  javascript.style.color = "#757575";
}

// Copy to clipboard
function copyJS() {
  // Select the text field
  var javascript = document.querySelector("pre");
  var copy = document.querySelector("#copy-btn");

  // Select the text
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(javascript);
  selection.removeAllRanges();
  selection.addRange(range);

  // Copy the text to the clipboard
  document.execCommand('copy');

  // Replace inner text of copy button
  copy.innerText = "Copied";
  setTimeout(() => {
    copy.innerText = "Copy";
  }, 1000);
}