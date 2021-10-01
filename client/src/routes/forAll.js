import {AllBeards, AllHairstyles, Barber, Barbers, Home, OneBeard, OneHairstyle, Category} from "./componentsList";

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
        component: Category
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
    {
        name: "Один парикмахер",
        path: "/barber/:id",
        exact: true,
        component: Barber
    }
]

export default list;