const stagesCarousel = document.querySelector(".stages__carousel");
const carouselList = stagesCarousel.querySelector("#stages-carousel-list");
const carouselCounts = stagesCarousel.querySelectorAll(
  ".stages__carousel-count",
);
const listChildrenCount = carouselList.childElementCount;

const carouselPaginationList = stagesCarousel.querySelector(
  ".carousel__pagination",
);
const paginationItems = carouselPaginationList.querySelectorAll(
  ".carousel__pagination-item",
);

const buttonRight = stagesCarousel.querySelector(".carousel__button--right");
const buttonLeft = stagesCarousel.querySelector(".carousel__button--left");
let stagesSliderPosition = 0;
let moveStep = 100;

let currentPaginationItem = carouselPaginationList.querySelector(
  "#carousel-pagination-item0",
);

const isDisable = () => {
  if (stagesSliderPosition === 0) {
    buttonLeft.setAttribute("disabled", "disabled");
  } else {
    buttonLeft.removeAttribute("disabled");
  }

  if (stagesSliderPosition === (listChildrenCount - 1) * -moveStep) {
    buttonRight.setAttribute("disabled", "disabled");
  } else {
    buttonRight.removeAttribute("disabled");
  }
};

export const initCarouselStages = () => {
  carouselCounts.forEach((item) => (item.textContent = carouselCount()));

  const onButtonChangeSlide = (slideStep) => {
    if (
      stagesSliderPosition + slideStep <= 0 &&
      stagesSliderPosition + slideStep > listChildrenCount * -moveStep
    ) {
      stagesSliderPosition += slideStep;
      carouselList.style.transform = `translate3d(${stagesSliderPosition}%, 0, 0)`;

      currentPaginationItem.classList.remove(
        "carousel__pagination-item--current",
      );

      currentPaginationItem = carouselPaginationList.querySelector(
        `#carousel-pagination-item${stagesSliderPosition / -moveStep}`,
      );

      currentPaginationItem.classList.add("carousel__pagination-item--current");

      isDisable();
    }
  };

  const onClickMoveLeft = () => {
    onButtonChangeSlide(moveStep);
  };
  const onClickMoveRight = () => {
    onButtonChangeSlide(-moveStep);
  };

  buttonRight.addEventListener("click", onClickMoveRight);
  buttonLeft.addEventListener("click", onClickMoveLeft);
};

const onPaginationChangeSlide = (e) => {
  const selectedIndex = Array.from(paginationItems).indexOf(e.target);
  stagesSliderPosition = -moveStep * selectedIndex;
  carouselList.style.transform = `translate3d(${stagesSliderPosition}%, 0, 0)`;

  currentPaginationItem.classList.remove("carousel__pagination-item--current");
  currentPaginationItem = e.target;
  e.target.classList.add("carousel__pagination-item--current");

  isDisable();
};

paginationItems.forEach((item) =>
  item.addEventListener("click", onPaginationChangeSlide),
);

const createCounter =
  (counter = 0) =>
  () =>
    ++counter;

const carouselCount = createCounter();
