import {Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {useFourThreeCardMediaStyles} from "@mui-treasury/styles/cardMedia/fourThree"
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({

    actionArea: {
        margin: "5px 0",
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
            zIndex: 1
        },
    },
    card: ({ shadowColor }) => ({
        minWidth: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${shadowColor}`,
        },
    }),
    content: ({ color }) =>
        ({
            backgroundColor: color,
            padding: '1rem 1.5rem 1.5rem',
        })
    ,
    title: {
        fontFamily: 'Keania One',
        fontSize: '2rem',
        color: '#fff',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Montserrat',
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: 14,
    },
}));

const CustomCard = ({ classes, image, title, subtitle, onClick }) => {
    const mediaStyles = useFourThreeCardMediaStyles();

    return (
        <CardActionArea className={classes.actionArea} onClick={onClick}>
            <Card className={classes.card}>
                <CardMedia classes={mediaStyles} image={image} />
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant={'h2'}>
                        {title}
                    </Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

const MainMenu = ({setUserState}) => {
    const firstCard = useStyles({ color: '#203f52', shadowColor: 'rgba(39,106,150,0.51)' });
    const secondCard = useStyles({ color: '#34241e', shadowColor: '#cc520082' });

    const { text } = useSelector((store) => store.languages);

    const handleChooseType = (type) => {
        setUserState(type);
    }

    return (
        <>
            <Typography component={"div"} variant={"h4"}>{text.accountType}</Typography>
            <CustomCard
                onClick={() => handleChooseType("Barber")}
                classes={firstCard}
                title={text.titleBarber}
                subtitle={text.subtitleBarber}
                image={'https://nagatinsky.com/upload/content/in_59005ef218137.jpg'}
            />
            <CustomCard
                onClick={() => handleChooseType('Client')}
                name="Client"
                classes={secondCard}
                title={text.titleClient}
                subtitle={text.subtitleClient}
                image={'https://i.pinimg.com/736x/97/c0/dc/97c0dcaaef5334a51d386ed232c67f21.jpg'}
            />
        </>
    );
};

export default MainMenu;