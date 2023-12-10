"use strict";
const $ = selector => document.querySelector(selector);

const names = ["Ben", "Joel", "Judy", "Anne"];
const scores = [88, 98, 77, 88];

const createElementWithText = (tagName, text) => {
    const element = document.createElement(tagName);
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
    return element;
};

const addScore = () => {
    // get user entries
    const nameNode = $("#name");
    const scoreNode = $("#score");

    const name = nameNode.value;
    const score = parseInt(scoreNode.value);

    // check entries for validity
    let isValid = true;
    if (name == "") {
        nameNode.nextElementSibling.textContent = "Please enter a name";
        isValid = false;
    }
    if (isNaN(score) || score < 0 || score > 100) {
        scoreNode.nextElementSibling.textContent = "Score must be between 0 and 100.";
        isValid = false;
    }
    // if valid, to arrays and clear text boxex
    if (isValid) {
        names[names.length] = name;
        scores[scores.length] = score;
        nameNode.value = "";
        scoreNode.value = "";
    }

    // move focus either way
    nameNode.focus();
};

const displayResults = () => {
    let scoreTotal = 0;
    let highScore = 0;
    let highScoreName = 0;
    let averageScore = 0;
    for (let i in scores) {
        scoreTotal += scores[i];
        if (scores[i] > highScore) {
            highScore = scores[i];
            highScoreName = names[i];
        }
    }
    averageScore = (scoreTotal / scores.length).toFixed(0);

    const headerNode = createElementWithText("h2", "Results");
    const avgScoreNode = createElementWithText("p", `Average score = ${averageScore}`);
    const highScoreNode = createElementWithText("p", `High score = ${highScoreName} with a score of ${highScore}`);

    const div = $("#results");
    if (div.querySelector("h2") == undefined) {
        div.appendChild(headerNode);
        div.appendChild(avgScoreNode);
        div.appendChild(highScoreNode)
    } else {
        div.replaceChild(headerNode, div.firstChild);
        div.replaceChild(avgScoreNode, div.firstChild.nextElementSibling);
        div.replaceChild(highScoreNode, div.lastChild);
    }
};

const displayScores = () => {
    const div = $("#scores");
    div.textContent = ""; // clear any previous scores

    div.appendChild(createElementWithText("h2", "Scores"));

    for (let i in scores) {
        div.appendChild(createElementWithText("label", names[i]));
        div.appendChild(createElementWithText("label", scores[i]));
        div.appendChild(document.createElement("br"));
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // add event handlers
    $("#add").addEventListener("click", addScore);
    $("#display-results").addEventListener("click", displayResults);
    $("#display-scores").addEventListener("click", displayScores);

    $("#name").focus();
});