export const rbEventHandler = (modal, event) => {
    const target = event.target.id ? event.target : event.target.parentElement;
    modal.querySelectorAll('.lesson-icon').forEach(icon => icon.innerHTML = '<i class="far fa-circle"></i>');
    const icon = target.querySelector('i');
    if(!icon) return;
    icon.classList.remove('fa-circle');
    icon.classList.add('fa-dot-circle');
    return target;
};