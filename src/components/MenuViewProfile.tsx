import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Thông tin tài khoản',
        icon: <MailOutlined/>,
    },
    {
        key: 'sub2',
        label: 'Lịch sử đơn hàng',
        icon: <AppstoreOutlined/>,
    },
    {
        key: 'sub4',
        label: 'Sổ địa chỉ',
        icon: <SettingOutlined/>,
    },
    {
        key: 'sub5',
        label: 'Đổi mật khẩu',
        icon: <SettingOutlined/>,
    },
    {
        key: 'sub6',
        label: 'Đăng xuất',
        icon: <SettingOutlined/>,
    },
];

const MenuViewProfile = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            style={{width: 256}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            className={"mb-4 text-[#FFA726]"}
        />
    );
};

export default MenuViewProfile;