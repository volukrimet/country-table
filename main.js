const btnGet = $('button');
const myTable = $('#table');
const headers = ['Code', 'Flag', 'Name', 'Capital', 'Population'];

$.ajax({
    method: "GET",
    url: 'https://restcountries.com/v3.1/all'
}).done(getCountries);

function appendElement(element, string) {
    element.append(createTd(string));
}

function createTd(string) {
    let cell = $('<td>');
    cell.text(string);
    return cell;
}

function getCountries(response) {
    btnGet.removeAttr('disabled')

    let countries = response.sort((a, b) => (a.name.common > b.name.common ? 1 : -1))

    btnGet.on('click', () => {
        const table = $('<table>');
        table.addClass('display');
        table.addClass('cell-border');
        table.attr('id', 'table_id')

        const thead = $('<thead>');
        const headerRow = $('<tr>');
        const tbody = $('<tbody>')

        headers.forEach(headerText => {
            let header = $('<th>');
            header.text(headerText);
            headerRow.append(header);
            thead.append(headerRow);
        });

        table.append(thead);

        countries.forEach(country => {
            let row = $('<tr>');
            let img = $('<img>');
            let imgCell = $('<td>');

            appendElement(row, country.cca2);

            img.attr('src', country.flags.png);
            img.attr('width', 200);
            imgCell.append(img);
            imgCell.css({ padding: 0 });
            row.append(imgCell);

            appendElement(row, country.name.common);

            if (!country.capital)
                appendElement(row, 'no data');
            else appendElement(row, country.capital);

            appendElement(row, country.population);

            tbody.append(row);
            table.append(tbody);
        })
        myTable.append(table);
        btnGet.css('display', 'none');

        $(function() {
            $('#table_id').dataTable();
        });
    });
}