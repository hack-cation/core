// Apply quick hash anchors for fun linking
{
  document.querySelectorAll('section[id]').forEach((section) => {
    const id = section.id;
    const h2 = section.querySelector('h2');

    if (h2) {
      h2.innerHTML = `<a href="#${id}">#</a> ` + h2.innerHTML;
    }

    section.classList.add('nes-container', 'is-rounded', 'is-dark');
  });
}
