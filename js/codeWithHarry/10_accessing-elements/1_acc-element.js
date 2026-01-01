

console.log(document.body.firstChild); // returns the FIRST child of body element
console.log(document.body.lastChild);  // returns the LAST child of body element
console.log(document.body.childNodes); // returns a node list (WE CAN SAY IT IS A ARRAY OF NODES)


let arr = Array.from(document.body.childNodes); // returns an HTMLCollection (WE CAN SAY IT IS A ARRAY OF ELEMENTS)

console.log(arr);
