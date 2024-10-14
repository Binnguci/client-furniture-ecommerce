import {PageContainer, ProCard} from "@ant-design/pro-components";
import {Button, Dropdown} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";

function InformationAccount() {
    return (
        <div
            className={"flex-grow"}
            style={{
                background: '#F5F7FA',
            }}
        >
            <PageContainer
                header={{
                    title: 'Thông tin tài khoản',
                    ghost: true,
                    extra: [
                        <Button key="1">次要按0</Button>,
                        <Button key="2">次要按钮</Button>,
                        <Button key="3" type="primary">
                            主要按钮
                        </Button>,
                        <Dropdown
                            key="dropdown"
                            trigger={['click']}
                            menu={{
                                items: [
                                    {
                                        label: '下拉菜单',
                                        key: '1',
                                    },
                                    {
                                        label: '下拉菜单2',
                                        key: '2',
                                    },
                                    {
                                        label: '下拉菜单3',
                                        key: '3',
                                    },
                                ],
                            }}
                        >
                            <Button key="4" style={{padding: '0 8px'}}>
                                <EllipsisOutlined/>
                            </Button>
                        </Dropdown>,
                    ],
                }}
                tabBarExtraContent="测试tabBarExtraContent"
                tabList={[
                    {
                        tab: '基本信息',
                        key: 'base',
                        closable: false,
                    },
                    {
                        tab: '详细信息',
                        key: 'info',
                    },
                ]}
                tabProps={{
                    type: 'editable-card',
                    hideAdd: true,
                    onEdit: (e, action) => console.log(e, action),
                }}
            >
                <ProCard className={"flex-1"} direction="column" ghost gutter={[0, 16]}>
                    <ProCard style={{height: 200}} title={"ooo"}/>
                    <ProCard gutter={16} ghost style={{height: 200}}>
                        <ProCard colSpan={16}/>
                        <ProCard colSpan={8}/>
                    </ProCard>
                </ProCard>
            </PageContainer>
        </div>
    );
}

export default InformationAccount;