document.getElementById('university-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Previene trimiterea formularului
    const query = document.getElementById('search-input').value; // Preia valoarea din câmpul de input
    fetch(`http://universities.hipolabs.com/search?name=${query}`) // Trimite o cerere HTTP către API
        .then(response => response.json()) // Converteste răspunsul în format JSON
        .then(data => {
            const table = document.getElementById('universities-table'); // Referință la tabel
            const tbody = table.querySelector('tbody'); // Referință la corpul tabelului
            tbody.innerHTML = ''; // Golește corpul tabelului
            if (data.length > 0) {
                data.forEach(university => {
                    const row = document.createElement('tr'); // Creează un rând nou
                    row.innerHTML = `
                        <td>${university.name}</td>
                        <td>${university.country}</td>
                        <td><a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a></td>
                    `;
                    tbody.appendChild(row); // Adaugă rândul în tabel
                });
                table.style.display = 'table'; // Afișează tabelul
            } else {
                table.style.display = 'none'; // Ascunde tabelul dacă nu sunt rezultate
            }
        })
        .catch(error => {
            console.error('Eroare:', error); // Afișează erori în consolă
        });
});