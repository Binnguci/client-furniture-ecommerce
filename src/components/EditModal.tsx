import React from 'react';
import { Modal, Input } from 'antd';

interface EditModalProps {
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
    open: boolean;
}

export const EditModal: React.FC<EditModalProps> = ({
                                                        title,
                                                        value,
                                                        onChange,
                                                        onSave,
                                                        onCancel,
                                                        open,
                                                    }) => (
    <Modal
        title={title}
        open={open}
        onOk={onSave}
        onCancel={onCancel}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
            className: '!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300',
        }}
    >
        <Input value={value} onChange={onChange} placeholder="Nhập giá trị mới" />
    </Modal>
);
