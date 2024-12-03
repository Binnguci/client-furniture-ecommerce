import MenuViewProfile from "../components/MenuViewProfile.tsx";
import InformationAccount from "../components/InformationAccount.tsx";

export function Personal() {
    return (
        <div className={"flex flex-row pt-24"}>
            <MenuViewProfile/>
            <InformationAccount/>
        </div>

    );
}
