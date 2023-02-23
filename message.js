const msgElem = document.getElementById('welcome');

fetch('http://localhost:3000/user')
  .then( r => r.json() )
  .then( (r) => {
    msgElem.textContent = `Welcome ${r}`;
  });

