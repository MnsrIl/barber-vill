import React from "react";
import classNames from "classnames";
import styles from "../MyProfile/CustomProfileStyles";
import helloImage from "../../../image/avatar-hello.jpg";

import studio1 from "../../../image/studio-1.jpg";
import studio2 from "../../../image/studio-2.jpg";
import studio4 from "../../../image/studio-4.jpg";
import studio5 from "../../../image/studio-5.jpg";

import GridContainer from "../MyProfile/CustomComponents/Grid/GridContainer";
import GridItem from "../MyProfile/CustomComponents/Grid/GridItem";
import NavPills from "../MyProfile/CustomComponents/NavPills/NavPills";
import { Camera, Room, RateReview } from "@material-ui/icons";
import MapGL from "react-map-gl";

const useStyles = styles;

function BarberModelPage(props) {
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  return (
    <div
      className={classNames(classes.main, classes.mainRaised)}
      style={{ minHeight: 850 }}
    >
      <div sx={{ pb: 8, mb: 8 }}>
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img src={helloImage} alt="..." className={imageClasses} />
                </div>
                <div>
                  <h3 className={classes.title}>Имя</h3>

                  <h6
                    style={{
                      fontSize: "1em",
                      fontWeight: "600",
                      margin: "4px 0",
                    }}
                  >
                    Парикмахер
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
                          <img
                            alt="..."
                            src={studio1}
                            className={navImageClasses}
                          />
                          <img
                            alt="..."
                            src={studio2}
                            className={navImageClasses}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <img
                            alt="..."
                            src={studio5}
                            className={navImageClasses}
                          />
                          <img
                            alt="..."
                            src={studio4}
                            className={navImageClasses}
                          />
                        </GridItem>
                      </GridContainer>
                    ),
                  },
                  {
                    tabButton: "location",
                    tabIcon: Room,
                    tabContent: (
                      <GridContainer justifyContent="center">
                        <GridItem xs={12} sm={12} md={4}>
                          {/* <div>
                                        <MapGL
                                        width={700}
                                        height={450}
                                        latitude={37.78}
                                        longitude={-122.45}
                                        zoom={11}
                                        mapboxApiAccessToken={'pk.eyJ1IjoiMW0yMno1Nmw3N2sifQ.YNkaLBJBc4lNXa5A'}
                                        mapStyle={'mapbox://styles/mapbox/basic-v9'}
                                        />
                                    </div> */}
                        </GridItem>
                      </GridContainer>
                    ),
                  },
                  {
                    tabButton: "Reviews",
                    tabIcon: RateReview,
                    tabContent: (
                      <GridContainer justifyContent="center">
                        <GridItem xs={12} sm={12} md={4}></GridItem>
                      </GridContainer>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default BarberModelPage;
