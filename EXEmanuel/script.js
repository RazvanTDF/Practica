document.getElementById('university-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    fetch(`http://universities.hipolabs.com/search?name=${query}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('universities-table');
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            if (data.length > 0) {
                data.forEach(university => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="university-name">${university.name}</td>
                    `;
                    row.addEventListener('click', () => showModal(university));
                    tbody.appendChild(row);
                });
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Eroare:', error);
        });
});

function showModal(university) {
    const modal = document.getElementById('university-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCountry = document.getElementById('modal-country');
    const modalWebsite = document.getElementById('modal-website');

    modalTitle.textContent = university.name;
    modalCountry.textContent = university.country;
    modalWebsite.href = university.web_pages[0];
    modalWebsite.textContent = university.web_pages[0];

    modal.style.display = 'block';

    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
} 