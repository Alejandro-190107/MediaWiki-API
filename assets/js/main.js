const formData   = document.getElementById('form-search');
const inputValue = document.getElementById('input-search');
const resultInfo = document.getElementById('results');
const url = 'https://es.wikipedia.org/w/api.php?action=query&list=search&srlimit=21&format=json&origin=*&srsearch=';

formData.addEventListener('submit', (e) => {
  e.preventDefault();formData
  const value = inputValue.value;
    if (!value) {
        resultInfo.innerHTML ='<div class="alert alert-dark" role="alert"> <i class="fas fa-exclamation-triangle"></i> Por Favor Ingrese Un Término De Búsqueda Válido. </div>';
        return;
    } 
    fetchPages(value);
});

const fetchPages = async (searchValue) => {
    try {
        const answer = await fetch(`${url}${searchValue}`);
        const data = await answer.json();
        const results = data.query.search;

        if (results.length < 1) {
            resultInfo.innerHTML = '<div class="alert alert-dark" role="alert"> <i class="fas fa-exclamation-triangle"></i> No hay Coincidencias Con La Búsqueda. Inténtalo De Nuevo. </div>';
            return;
        }
        renderResults(results);
    } 
        catch (error) {
            resultInfo.innerHTML = '<div class="alert alert-dark" role="alert"> <i class="fas fa-exclamation-triangle"></i> ¡¡ Ups Hubo Un Error !! </div>';
        }
};

const renderResults = (list) => {

    const cardsList = list.map((item) => {
      const { title, snippet, pageid } = item;
      return `<div class="card">
                <div class="card-header">
                    <p class="card-title"> <i class="fas fa-book-open"></i> ${title} </p>
			    </div>
                <div class="card-body">
                    <p class="card-text"> ${snippet} </p>   
                </div>
                <div class="card-footer">
                    <a href=http://es.wikipedia.org/?curid=${pageid} class="btn btn-dark" title="Cargar Otra Imagen" target="_blank"> Ver Más </a>
                </div>
            </div>`;
    })
    .join('');
  resultInfo.innerHTML = `<div class="grid"> ${cardsList} </div>`;
};