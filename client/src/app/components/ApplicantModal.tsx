import React from 'react'
import ModalWrapper from './ModalWrapper'

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

const ApplicantModal = (props: Props) => {
    const { isOpen, closeModal } = props;
    return (
        <ModalWrapper isOpen={isOpen} closeModal={closeModal}><span>APPLICANT</span></ModalWrapper>
    )
}

export default ApplicantModal