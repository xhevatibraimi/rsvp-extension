class RSVPConverter {

  convertWord(str) {
    const midpoint = Math.ceil(str.length / 2);
    const firstHalf = str.slice(0, midpoint);
    const secondHalf = str.slice(midpoint);
    const wrappedString = `<b>${firstHalf}</b>${secondHalf}`;
    return wrappedString;
  }

  convertText(text) {
    let words = [];
    for (const word of text.split(" ")) {
      words.push(this.convertWord(word));
    }
    return words.join(" ");
  }

  convertTextNode(node) {
    const span = document.createElement('span');
    span.innerHTML = this.convertText(node.textContent);
    node.parentNode.replaceChild(span, node);
  }

  iterateNodes(node) {
    const nodes = [node];

    while (nodes.length) {
      const node = nodes.pop();
      if (node && node.nodeType === Node.TEXT_NODE) {
        this.convertTextNode(node)
      } else {
        nodes.push(...node.childNodes);
      }
    }
  }

  convertDefault(selector) {
    const container = document.querySelector('body');
    this.iterateNodes(container);
  }
}