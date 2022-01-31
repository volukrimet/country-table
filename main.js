const btnGet = $('button');
const myTable = $('#table');
const headers = ['Code', 'Flag', 'Name', 'Capital', 'Population'];
let countries = []

$.ajax({
    method: "GET",
    url: 'https://restcountries.com/v3.1/all'
}).done(getCountries);

setTimeout(() => {
    btnGet.removeAttr('disabled');
}, 3000);

btnGet.on('click', () => {
    const table = $('<table>');
    const headerRow = $('<tr>');

    headers.forEach(headerText => {
        let header = $('<th>');
        header.text(headerText);
        headerRow.append(header);
    });

    table.append(headerRow);

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

        table.append(row);


    })
    myTable.append(table);
    btnGet.css('display', 'none');
});

function appendElement(element, string) {
    element.append(createTd(string));
}

function createTd(string) {
    let cell = $('<td>');
    cell.text(string);
    return cell;
}

function getCountries(response) {
    response.map(country => countries.push(country));
    countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1);
}