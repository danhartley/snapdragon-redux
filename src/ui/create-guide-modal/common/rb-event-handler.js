export const rbEventHandler = (modal, event) => {
    const target = event.target.id ? event.target : event.target.parentElement;
    modal.querySelectorAll('.lesson-icon').forEach(icon => icon.innerHTML = '<i class="far fa-circle"></i>');
    target.querySelector('i').classList.remove('fa-circle');
    target.querySelector('i').classList.add('fa-dot-circle');
    return target;
};