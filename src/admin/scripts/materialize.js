export const initMaterialize = () => {
    document.addEventListener('DOMContentLoaded', function() {

        const modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
    
        const selectors = document.querySelectorAll('select');
        M.FormSelect.init(selectors);

        const species = document.querySelector('#licences');
        const el = M.FormSelect.init(species);
    });
};