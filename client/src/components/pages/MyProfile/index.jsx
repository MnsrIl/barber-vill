import {useSelector} from "react-redux";
import BarberProfile from "./BarberProfile";
import ClientProfile from "./ClientProfile";
import {SnackbarProvider} from "notistack";

const MyProfile = () => {
    const person = useSelector(store => store.auth.person);

    return (
        <SnackbarProvider>
            {person?.role === "Barber" ? <BarberProfile /> : <ClientProfile />}
        </SnackbarProvider>
    )

};
export default MyProfile;
