import Modal from '../../shared/components/Modal';

const UserModal = (props) => {
  return (
    <Modal onCloseModalHandler={props.openCloseProfileModal} isVisible={props.profileModal}>
      <div>amine</div>
    </Modal>
  );
};

export default UserModal;
