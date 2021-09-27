import {useSelector} from "react-redux";
import BarberProfile from "./BarberProfile";
import ClientProfile from "./ClientProfile";

const MyProfile = () => {
    const person = useSelector(store => store.auth.person);

    return (
        <div>
            {person?.role === "Barber" ? <BarberProfile /> : <ClientProfile />}
        </div>
    )

};
export default MyProfile;
