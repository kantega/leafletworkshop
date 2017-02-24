
const checkboxes = document.querySelectorAll('input[type=checkbox]');

checkboxes.forEach((checkbox) => {
    if (localStorage[checkbox.id]) {
        checkbox.setAttribute('checked', true);
    }
});


const labels = document.querySelectorAll('label');

labels.forEach((label) => {
    label.addEventListener('click', () => {

        const id = label.htmlFor;
        const checkbox =  document.querySelector('#' + id); 

        if (checkbox.checked) {
            localStorage.removeItem(id);
        } else {
            localStorage.setItem(id, true);
        }

    }, false);
});