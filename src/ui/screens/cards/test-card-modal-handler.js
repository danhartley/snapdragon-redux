import { subscription } from 'redux/subscriptions';

const onCloseModal = () => {

    const modal = document.querySelector('#lessonModal');
    const closer = modal.querySelector('.js-modal-footer');
          closer.addEventListener('click', async e => {
            const contents = modal.querySelector('.js-modal-text');
                  contents.innerHTML = `
                    <div class="lesson-spinner double-centred-block">
                        <div class="icon"><i class="fas fa-sun slow-spin"></i></div>
                    </div>
                  `;
          });    
};

export const lessonModalHandler = {
    onCloseModal
};