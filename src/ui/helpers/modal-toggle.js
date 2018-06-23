export const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const isActive = modal.classList.contains('show');
    if(isActive) {
        document.body.classList.remove('modal-open');
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', true)
        document.querySelector('.modal-backdrop.fade.show').remove();
        document.querySelector('.js-settings').click();
    }
};