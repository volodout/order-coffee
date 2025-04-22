let count = 1;
document.querySelector(".add-button").addEventListener("click", () => {
    count++;
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    newForm.querySelector("h4").innerHTML = `Напиток №${count}`;
    for (let radio of newForm.querySelectorAll("input[type=radio]")) {
        radio.name = "milk" + count;
    }

    let removeButton = newForm.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
        if(count > 1){
            newForm.remove();
            count--;
        }
    });
    forms[forms.length - 1].after(newForm);
});

document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
    updateModalTable();
});

document.querySelector('.close-model').addEventListener('click', () => {
    closeModal();
});

function openModal() {
    const overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'visible';
    document.querySelector('.status-order').textContent = updateBeverageCount();
}

function updateBeverageCount() {
    const num = document.querySelectorAll('fieldset').length;
    const mod = num % 10;
    return `Заказ принят! Вы заказали ${num} ${num !== 11 && mod === 1 ?
        'напиток'
        : (num > 20 && (mod === 2 || mod === 3 || mod === 4)) || (num >= 2 && num <= 4) ?
            'напитка'
            : 'напитков'}`;
}

function closeModal() {
    const overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'hidden';
}

let dict = {
    'espresso': 'Эспрессо',
    'capuccino': 'Капучино',
    'cacao': 'Какао',
    'usual' : 'Обычное',
    'no-fat' : 'Обезжиренное',
    'soy' : 'Соевое',
    'coconut' : 'Кокосовое',
}

function updateModalTable() {
    const beverages = [];
    const fields = document.querySelectorAll('.beverage');

    fields.forEach((field, index) => {
        const beverageName = field.querySelector('select').value;
        const milkType = field.querySelector('input[type="radio"]:checked').value;
        const extras = [];
        field.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            extras.push(checkbox.nextElementSibling.textContent);
        });
        beverages.push({
            beverage: dict[beverageName],
            milk: dict[milkType],
            extras: extras.join(', ')
        });
    });

    const modalTableBody = document.querySelector('.modal-table tbody');
    modalTableBody.innerHTML = '';

    beverages.forEach(beverage => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${beverage.beverage}</td>
            <td>${beverage.milk}</td>
            <td>${beverage.extras}</td>
        `;
        modalTableBody.appendChild(row);
    });
}