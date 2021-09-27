import { useHistory } from "react-router-dom";
import { Box, Button, Card, CardMedia, Grid } from "@material-ui/core";
import {
  GitHub as GitHubIcon,
  Female as FemaleIcon,
} from "@mui/icons-material";
import Header from "../Header";
import hairstyles from "../../../image/hairstyles1.jpg";
import beards from "../../../image/men-beards.jpg";
import useStyles from "./classes";

function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid className={classes.main}>
      <Header />
      <Grid xs={12} className={classes.content}>
        <Grid item xs={12} sm={5}>
          <Box className={classes.contenText}>
            <Box>
              <h1>Хочешь выглядеть как Султан?</h1>
            </Box>
            <Box>
              Сделай причёску, которая <br /> изменит твою жизнь. <br />
              Жизнь больше не станет прежней, ибо ты будешь выглядеть как -
              НурСултан!
            </Box>
          </Box>
          <Box
            display="flex"
            textAlign="center"
            cursor="pointer"
            height="50px"
            ml="70px"
          >
            <Button
              className={classes.triangle}
              onClick={() => history.push("/hairstyles")}
            >
              Все прически
            </Button>
            <Button
              className={classes.triangleB}
              onClick={() => history.push("/beards")}
            >
              Все бороды
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" mt="103px">
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
              <Box pb="30px" className={classes.cardLink}>
                <CardMedia
                  component={"img"}
                  src={hairstyles}
                  className={classes.cardImg}
                />
                <FemaleIcon
                  fontSize="large"
                  className={classes.cardIcon}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/beards")}
                />
              </Box>
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
