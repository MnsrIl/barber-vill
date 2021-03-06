import SignUpComponent from "../components/pages/Authorization/SignUp";
import LoginComponent from "../components/pages/Authorization/Login";
import CategoryComponent from "../components/pages/Category";
import HomePage from "../components/pages/Home/HomePage";
import OneBeardPage from "../components/pages/Beards/OneBeardPage";
import AllHairstylesPage from "../components/pages/HairStyles/AllHairstylesPage";
import AllBarbersPage from "../components/pages/Barbers/AllBarbersPage";
import AllBeardsPage from "../components/pages/Beards/AllBeardsPage";
import OneHairStyle from "../components/pages/HairStyles/OneHairStyle";
import MyProfile from "../components/pages/MyProfile/index";
import OneBarberPage from "../components/pages/Barbers/OneBarberPage";

export const Login = () => <LoginComponent />

export const Category = () => <CategoryComponent /> ;

export const SignUp = () => <SignUpComponent />

export const Home = () => <HomePage />

export const Barbers = () => <AllBarbersPage />

export const AllBeards = () => <AllBeardsPage />

export const AllHairstyles = () => <AllHairstylesPage />

export const OneBeard = () => <OneBeardPage />

export const OneHairstyle = () => <OneHairStyle />

export const Profile = () => <MyProfile />

export const Barber = () => <OneBarberPage />
