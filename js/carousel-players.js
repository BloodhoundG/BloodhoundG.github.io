import { renderPlayers } from "./render-players.js";

const playersSection = document.querySelector(".players");
const carouselList = playersSection.querySelector("#players-carousel-list");
const countCurrent = playersSection.querySelector(".players__count-current");
const allPlayer = playersSection.querySelector(".players__count-all");

const buttonRight = playersSection.querySelector(".carousel__button--right");
const buttonLeft = playersSection.querySelector(".carousel__button--left");

let playersSliderPosition = 0;
let moveStep = 100;
let displayedPlayers = 1;
let currentPlayer = 1;

const isScreenWidthDesktop = () => window.screen.width >= 1366;

export const initCarouselPlayers = () => {
  if (isScreenWidthDesktop()) {
    displayedPlayers = 3;
    currentPlayer = 3;
  }

  renderPlayers();
  const listChildrenCount = carouselList.childElementCount;
  let setMaxPlayersCount = listChildrenCount;

  allPlayer.textContent = `/${listChildrenCount}`;
  countCurrent.textContent = `${currentPlayer}`;

  const moveSlide = () => {
    carouselList.style.transform = `translate3d(${playersSliderPosition}%, 0, 0)`;
    countCurrent.textContent = `${currentPlayer}`;
  };

  const autoMoveSlider = () => {
    currentPlayer += displayedPlayers;
    onButtonChangeSlide(-moveStep);
  };
  // setInterval(autoMoveSlider, 4000);
  const onButtonChangeSlide = (slideStep) => {
    if (isScreenWidthDesktop()) {
      setMaxPlayersCount = listChildrenCount - 4;
    }

    if (playersSliderPosition + slideStep > 0) {
      playersSliderPosition = (setMaxPlayersCount - 1) * -moveStep;
      currentPlayer = listChildrenCount;
      moveSlide();
    } else if (
      playersSliderPosition + slideStep ===
      setMaxPlayersCount * -moveStep
    ) {
      playersSliderPosition = 0;
      currentPlayer = displayedPlayers;
      moveSlide();
    } else {
      playersSliderPosition += slideStep;
      moveSlide();
    }
  };
  const onClickMoveLeft = () => {
    currentPlayer -= displayedPlayers;
    onButtonChangeSlide(moveStep);
  };
  const onClickMoveRight = () => {
    currentPlayer += displayedPlayers;
    onButtonChangeSlide(-moveStep);
  };

  buttonRight.addEventListener("click", onClickMoveRight);
  buttonLeft.addEventListener("click", onClickMoveLeft);
};
