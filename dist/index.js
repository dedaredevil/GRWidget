function createElement(tagName, attrs = {}, ...children) {
  const elem = Object.assign(document.createElement(tagName), attrs);
  for (const child of children) {
    if (Array.isArray(child)) elem.append(...child);else elem.append(child);
  }
  return elem;
}
const name = "Geoff";
const friends = ["Sarah", "James", "Hercule"];
const app = createElement("div", {
  className: "app"
}, createElement("p", null, " Welcome back, ", name, " "), createElement("p", null, createElement("strong", null, "Your friends are:")), createElement("ul", null, friends.map(name => createElement("li", null, name))));
window.document.getElementById("widget").replaceWith(app);