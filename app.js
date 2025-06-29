const content = document.getElementById('content');

function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(response => {
      if (!response.ok) throw new Error('Page non trouvée');
      return response.text();
    })
    .then(html => {
      content.innerHTML = html;
    })
    .catch(err => {
      content.innerHTML = "<p>Erreur lors du chargement de la page.</p>";
    });
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('href').replace('#', '');
    loadPage(page);
    window.history.pushState({}, '', `#${page}`);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '') || 'accueil';
  loadPage(hash);
});