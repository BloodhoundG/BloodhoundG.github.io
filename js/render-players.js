import { PlayersArray } from "./data.js";

const playerList = document.querySelector("#players-carousel-list");

const playerTemplate = document
  .querySelector("#player-item")
  .content.querySelector(".players__carousel-item");

export const renderPlayers = () => {
  PlayersArray.forEach((item) => {
    const playerItem = playerTemplate.cloneNode(true);
    const userName = playerItem.querySelector(".players__user-name");
    const userRank = playerItem.querySelector(".players__user-rank");
    const userPhoto = playerItem.querySelector(".players__user-photo");
    const userLink = playerItem.querySelector(".players__user-link");

    userName.textContent = item.name;
    userRank.textContent = item.rank;
    userPhoto.src = item.photo;
    userLink.href = item.href;

    playerList.appendChild(playerItem);
  });
};
