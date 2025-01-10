import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {styled} from "@mui/material/styles";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material"; // Đảm bảo bạn đã có CustomTooltip component

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#FFA726",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontWeight: 700,
        fontSize: 11,
    },
}));

interface AccountOption {
    option: string;
    href: string;
    icon: IconDefinition;
}

interface AccountPopoverProps {
    user: { username: string } | null;
    accounts: AccountOption[];
    handleOnClick: (option: string) => void;
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ user, accounts, handleOnClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const togglePopover = (): void => {
        setIsOpen(!isOpen);
    };

    const closePopover = (): void => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Nút mở Popover */}
            <button
                onClick={togglePopover}
                className="flex items-center text-white hover:text-[#FFA726] gap-x-1 text-sm font-semibold leading-6 outline-none"
            >
                <CustomTooltip title="Tài khoản">
                    <FontAwesomeIcon icon={faUser} color="#FFA726" />
                </CustomTooltip>
                {user ? (
                    <h1 className="text-[#FFA726]">{user.username}</h1>
                ) : (
                    <h1>Welcome, Guest</h1>
                )}
            </button>

            {/* Dropdown Popover */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-[15rem] bg-white shadow-lg border border-gray-200 rounded-lg z-50">
                    <div className="p-4">
                        {accounts.map((item: AccountOption) => (
                            <Link
                                to={item.href}
                                key={item.option}
                                onClick={() => {
                                    handleOnClick(item.option);
                                    closePopover();
                                }}
                                className="flex items-center gap-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-50 group-hover:text-[#FFA726]">
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{item.option}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPopover;
