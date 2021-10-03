import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useParams } from "react-router";
import { Camera, Room, RateReview } from "@material-ui/icons";
import { Box } from "@mui/system";

import GridContainer from "../MyProfile/CustomComponents/Grid/GridContainer";
import GridItem from "../MyProfile/CustomComponents/Grid/GridItem";
import NavPills from "../MyProfile/CustomComponents/NavPills/NavPills";
import styles from "../MyProfile/CustomProfileStyles";

import HeaderPage from "./HeaderPage"
import AddReviews from "../Reviews/AddReviews";
import { getOneBarber } from "../../../redux/feautures/barbers";

import helloImage from "../../../image/avatar-hello.jpg";
import studio1 from "../../../image/studio-1.jpg";
import studio2 from "../../../image/studio-2.jpg";
import studio4 from "../../../image/studio-4.jpg";
import studio5 from "../../../image/studio-5.jpg";


const useStyles = styles;

function BarberModelPage(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, currentBarber } = useSelector((store) => store.barbers);

  useEffect(() => {
    dispatch(getOneBarber(id));
  }, [id, dispatch]);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  return (
    <div>
    <HeaderPage />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ minHeight: 850 }}
      >
        {loading ? (
          <Box display = "flex" justifyContent = "center">
            <h1>Идет загрузка</h1>
          </Box>
        ) : (
          <div sx={{ pb: 8, mb: 8 }}>
            <div className={classes.container}>
              <GridContainer justifyContent="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={helloImage} alt="..." className={imageClasses} 
                      style={{transform: "translate3d(0, -50%, 0)"}} />
                    </div>
                    <div>
                      <h3 className={classes.title}>{currentBarber?.name}</h3>
                      <h6
                        style={{
                          fontSize: "1em",
                          fontWeight: "600",
                          margin: "4px 0",
                        }}
                      >
                      </h6>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer justifyContent="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Studio",
                        tabIcon: Camera,
                        tabContent: (
                          <GridContainer justifyContent="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={studio1} className={navImageClasses}
                              />
                              <img alt="..." src={studio2} className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={studio5} className={navImageClasses}
                              />
                              <img alt="..." src={studio4} className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer> ),
                      },
                      {
                        tabButton: "location",
                        tabIcon: Room,
                        tabContent: (
                          <GridContainer justifyContent="center">
                            <GridItem xs={12} sm={12} md={4}>
                             {/* здесь будет карта */}
                            </GridItem>
                          </GridContainer> ),
                      },
                      {
                        tabButton: "Reviews",
                        tabIcon: RateReview,
                        tabContent: (
                          <GridContainer direction={"column"} justifyContent={"center"} >
                              <AddReviews />
                          </GridContainer>
                        )},
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarberModelPage;
