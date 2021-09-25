import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { GitHub as GitHubIcon, Female as FemaleIcon } from "@mui/icons-material";
import Header from "../Header";
import hairstyles from "../../../image/hairstyles1.jpg";
import beards from "../../../image/men-beards.jpg";
import useStyles from "./classes"

function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid className={classes.main}>
      <Header />
      <Grid xs={12} className={classes.content}>
        <Grid item xs={12} sm={5}>
          <Box width={340} height={306} ml="150px" mt="80px" color="white">
            <Box>
              <h1>Хочешь выглядеть как Султан?</h1>
            </Box>
            <Box>
              Сделай причёску, которая <br /> изменит твою жизнь. <br />
              Жизнь больше не станет прежней, ибо ты будешь выглядеть как -
              НурСултан!
            </Box>
          </Box>
          <Box display="flex" textAlign="center" cursor="pointer" height="50px">
            <Button
              onClick={() => history.push("/hairstyles")}
              className={classes.triangle}
            >
              Все прически
            </Button>
            <Button
              onClick={() => history.push("/beards")}
              className={classes.triangleB}
            >
              Все бороды
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" mt="80px">
            <Card className={classes.card}>
              <Box pb="30px" className={classes.cardLink}>
                <CardMedia
                  component={"img"}
                  src={beards}
                  className={classes.cardImg}
                />
                <FemaleIcon
                  fontSize="large"
                  className={classes.cardIcon}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/hairstyles")}
                />
              </Box>
            </Card>

            <Card className={classes.card}>
              <CardActionArea>
                <Box>
                  <CardMedia
                    component={"img"}
                    src={hairstyles}
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/beards")}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Box className={classes.footer}>
        <Box>
          <a href={"https://github.com/TheZiggie/barber-vill"}>
            <GitHubIcon htmlColor={"white"} fontSize="large" />
          </a>
        </Box>
      </Box>
    </Grid>
  );
}

export default HomePage;
