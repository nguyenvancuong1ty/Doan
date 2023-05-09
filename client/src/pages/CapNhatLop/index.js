import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useState } from 'react';
import { ModalPopper } from '../ModalPopper';
import ModalCapNhatLop from '../ModalPopper/ModalCapNhatLop';

function CapNhatLop() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1 className="title">
                        Danh sách lớp{' '}
                        <Button
                            primary
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </h1>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModalCapNhatLop setOpenModal={setModalOpen} />
                </ModalPopper>
            )}
        </>
    );
}

export default CapNhatLop;
