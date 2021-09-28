import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import CountDownTimer from "./CountDownTimer";

import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  ButtonBase,
  CardActionArea,
  Dialog,
  DialogTitle,
  Modal,
} from "@mui/material";

import ReactCardFlip from "react-card-flip";

import { useEffect, useState, useReducer } from "react";

function Main(props) {
  const level = props.location.state.player.level;
  const grid = props.location.state.player.level * 2;
  const numberOfCards = Math.pow(grid, 2);
  const numberOfIcons = 4040;
  //ne trebaju mi ms
  const timeLimitInMs = (numberOfCards / 2) * 60000;

  const [cards, setCards] = useState([]);
  const [pending, setPending] = useState(false);
  const [firstCardClicked, setFirstCardClicked] = useState();
  const [secondCardClicked, setSecondCardClicked] = useState();
  const [currentTimeInMs, setCurrentTimeInMs] = useState(timeLimitInMs);
  const [score, setScore] = useState(props.location.state.player.score);
  const [cardsLeft, setCardsLeft] = useState(numberOfCards);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setCards(generateRandomCardsCodesArray(numberOfCards));
  }, []);

  function createCardCodeFromRandomNumber(randomNumber) {
    let cardCode = String(randomNumber);
    let cardCodeLength = cardCode.length;
    for (let i = 0; i < 4 - cardCodeLength; i++) {
      cardCode = "0" + cardCode;
    }
    cardCode = "File " + cardCode;
    return cardCode;
  }

  function getRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //shuffle implicira random
  function randomlyShuffleArray(array) {
    let currentIndex = array.length;
      let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const generateRandomCardsCodesArray = (numberOfCards) => {
    let cardsCodes = new Set();

    while (cardsCodes.size != numberOfCards / 2) {
      cardsCodes.add(
        createCardCodeFromRandomNumber(
          getRandomIntegerInRange(1, numberOfIcons)
        )
      );
    }

    cardsCodes = randomlyShuffleArray([
      ...Array.from(cardsCodes),
      ...Array.from(cardsCodes),
    ]);

    const cards = [];

    cardsCodes.forEach((code, index) => {
      cards.push({ code, index, clicked: false, onScreen: true });
    });

    return cards;
  };

  return (
    <>
      <Modal
        shouldCloseOnOverlayClick={false}
        open={!cardsLeft || !currentTimeInMs}
      >
        <div>{score}</div>
      </Modal>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="1"
      >
        <div>{score}</div>
        <Grid
          sx={{ textAlign: "center", width: 0.4, height: 0.65 }}
          container
          spacing={2}
        >
          {cards
            ? cards.map((card) => (
                <Grid item xs={12 / grid}>
                  {card.onScreen ? (
                    <ReactCardFlip
                      containerStyle={{ width: "100%", height: "100%" }}
                      isFlipped={cards[card.index].clicked}
                      flipDirection="horizontal"
                    >
                      <Card
                        sx={{ width: "100%", height: "100%" }}
                        onClick={() => {
                          if (pending) return;

                          if (firstCardClicked && !secondCardClicked) {
                            setSecondCardClicked(card);
                            setCards((prevState) => {
                              prevState[card.index].clicked = true;

                              return prevState;
                            });

                            if (
                              card.index !== firstCardClicked.index &&
                              card.code === firstCardClicked.code
                            ) {
                              setPending(true);
                              setScore((prevState) => prevState + 2);
                              setCardsLeft((prevState) => prevState - 2);

                              setTimeout(() => {
                                setCards((prevState) => {
                                  prevState[card.index].onScreen = false;
                                  prevState[
                                    firstCardClicked.index
                                  ].onScreen = false;
                                  setFirstCardClicked(null);
                                  setSecondCardClicked(null);
                                  return prevState;
                                });
                                setPending(false);
                                forceUpdate();
                              }, 1500);
                              return;
                            } else {
                              setPending(true);
                              setTimeout(() => {
                                setCards((prevState) => {
                                  prevState[
                                    firstCardClicked.index
                                  ].clicked = false;
                                  prevState[card.index].clicked = false;
                                  setFirstCardClicked(null);
                                  setSecondCardClicked(null);
                                  return prevState;
                                });
                                setPending(false);
                                forceUpdate();
                              }, 1500);
                              return;
                            }
                          } else {
                            setCards((prevState) => {
                              prevState[card.index].clicked = true;

                              return prevState;
                            });
                            setFirstCardClicked(card);
                          }
                          forceUpdate();
                        }}
                      >
                        <CardContent
                          style={{
                            backgroundColor: "#212121",
                            height: "100%",
                            width: "100%",
                          }}
                        ></CardContent>
                      </Card>

                      <Card
                        sx={{
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          textAlign: "center",
                          display: "flex",
                        }}
                        onClick={() => {
                          if (pending) return;
                          if (firstCardClicked)
                            if (card.code === firstCardClicked.code) {
                              return;
                            }

                          setCards((prevState) => {
                            const newState = prevState;
                            newState[card.index].clicked = false;
                            return newState;
                          });

                          forceUpdate();
                        }}
                      >
                        <img
                          alt={"Error"}
                          style={{ width: "60%" }}
                          src={require(`../icons/${card.code}.svg`).default}
                        />
                      </Card>
                    </ReactCardFlip>
                  ) : (
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        textAlign: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        alt={"Error"}
                        style={{ width: "60%" }}
                        src={require(`../icons/${card.code}.svg`).default}
                      />
                    </Card>
                  )}
                </Grid>
              ))
            : null}
          <CountDownTimer
            miliseconds={timeLimitInMs}
            setCurrentTimeInMsInParentComponent={setCurrentTimeInMs}
            stopCountdown={!cardsLeft}
          />
        </Grid>
      </Box>
    </>
  );
}

export default withRouter(Main);
