import { useHistory } from "react-router-dom";
import { Box, Button, Card, CardMedia, Grid } from "@material-ui/core";
import { GitHub as GitHubIcon, Female as FemaleIcon, Male as MaleIcon} from "@mui/icons-material";
import Header from "../Header";
import ManCardImage from "../../../image/CardWithMan.png";
import WomenCardImage from "../../../image/CardWithWoman.png";
import useStyles from "./classes";
import { useSelector } from "react-redux";

function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  const { text } = useSelector((store) => store.languages);

  return (
    <Grid className={classes.main}>
      <Header />
      <Grid xs={12} className={classes.content}>
        <Grid item xs={12} sm={5}>
          <Box className={classes.contenText}>
            <Box>
              <h1>{text.title1}</h1>
            </Box>
            <Box>
             {text.title2}<br/> 
             {text.title3} <br/>
             {text.title4}
            </Box>
          </Box>
          <Box className={classes.blockCard}>
            <Button
              className={classes.triangle}
              onClick={() => history.push("/hairstyles")}
            >
              {text.btnHairStyles}
            </Button>
            <Button
              className={classes.triangleB}
              onClick={() => history.push("/beards")}
            >
              {text.btnBeards}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" mt="103px">
            <Card className={classes.card}>
              <Box pb="30px" className={classes.cardLink}>
                <CardMedia
                  component={"img"}
                  src={WomenCardImage}
                  className={classes.cardImg}
                />
                <FemaleIcon
                  fontSize="large"
                  className={classes.cardIcon}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/hairstyles?gender=Ж")}
                />
              </Box>
            </Card>

            <Card className={classes.card}>
              <Box className={classes.cardLink}>
                <CardMedia
                  component={"img"}
                  src={ManCardImage}
                  className={classes.cardImg}
                />
                <MaleIcon
                    color={"primary"}
                    fontSize="large"
                    className={classes.cardIcon}
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/hairstyles")}
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
