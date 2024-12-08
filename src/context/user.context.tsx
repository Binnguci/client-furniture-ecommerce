import React, {createContext, useContext, useEffect, useState} from "react";
import http from "../utils/http.ts";

interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    const response = await http.get(`/user/get-information-user`, {
                        params: {
                            accessToken: accessToken
                        }
                    });
                    setUser(response.data.result);
                } else {
                    console.error("AccessToken không tồn tại trong localStorage");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        })();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
