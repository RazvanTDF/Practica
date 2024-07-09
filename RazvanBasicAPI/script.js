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
                        <td class="university-name text-primary" style="cursor: pointer;">${university.name}</td>
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
            console.error('Error:', error);
        });
});

function showModal(university) {
    const modalTitle = document.getElementById('modal-title');
    const modalCountry = document.getElementById('modal-country');
    const modalWebsite = document.getElementById('modal-website');
    modalTitle.textContent = university.name;
    modalCountry.textContent = university.country;
    modalWebsite.href = university.web_pages[0];
    modalWebsite.textContent = university.web_pages[0];

    $('#university-modal').modal('show');
}
