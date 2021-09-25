import {AllBeards, AllHairstyles, Barbers, Home, OneBeard, OneHairstyle} from "./componentsList";

const list = [
    {
        name: "Главная",
        path: "/",
        exact: true,
        component: Home
    },
    {
        name: "Все парикмахеры",
        path: "/barbers",
        exact: true,
        component: Barbers
    },
    {
        name: "Все причёски",
        path: "/hairstyles",
        exact: true,
        component: AllHairstyles
    },
    {
        name: "Одна причёска",
        path: "/hairstyles/:hairstyleId",
        exact: true,
        component: OneHairstyle
    },
    {
        name: "Все бороды",
        path: "/beards",
        exact: true,
        component: AllBeards
    },
    {
        name: "Одна борода",
        path: "/beards/:beardId",
        exact: true,
        component: OneBeard
    },
]

export default list;