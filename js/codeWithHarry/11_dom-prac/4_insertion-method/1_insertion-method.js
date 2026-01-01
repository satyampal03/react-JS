

let insertText = document.getElementsByTagName("div")[1] // 2nd bucket will execute here

insertText.innerHTML = insertText.innerHTML+ "<h3> This is Heading 3rd</h3>";

insertText.appendChild("div");


// a.append(div);
// a.prepend(div);
// a.before(div);
// a.after(div);

// a.replaceWith(div);