import styled, { createGlobalStyle } from "styled-components";

type GlobalThemeT = {
    "backgroundColor": string,
    "darkerBackgroundColor": string,
    "navColor": string,
    "buttonColor": string,
    "hoverButtonColor": string,
    "fontColor": string,
    "navHeight": string
}
// export const GlobalTheme:GlobalThemeT = {
//     "backgroundColor": "#ddd",
//     "navColor": "#ffcd60",
//     "buttonColor": "#ffc74d",
//     "hoverButtonColor": "#d8a22e",
//     "fontColor": "#222",
//     "navHeight": "50px"
// }

export const GlobalTheme:GlobalThemeT = {
    "backgroundColor": "#eeeeee",
    "darkerBackgroundColor": "#d6d6d6",
    "navColor": "#4DD099",
    "buttonColor": "#4DD099",
    "hoverButtonColor": "#3ea57a",
    "fontColor": "#222",
    "navHeight": "50px"
}

// export const GlobalTheme:GlobalThemeT = {
//     "backgroundColor": "#272727",
//     "darkerBackgroundColor": "#161616",
//     "navColor": "#4DD099",
//     "buttonColor": "#4DD099",
//     "hoverButtonColor": "#3ea57a",
//     "fontColor": "#f3f3f3",
//     "navHeight": "50px"
// }

export const GlobalStyle = createGlobalStyle`
    body {
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        transition: all 0.2s ease;
        background-color: ${GlobalTheme.backgroundColor};
        box-sizing: border-box;
    }

    div.App {
        display: grid;
        grid-template-rows: auto 1fr;
        width: 100%;
        height: 100%;
    }

    h1 {
        text-align: center;
        margin: 0;
        text-shadow: 2px 2px 2px black;
    }

    input {
        outline: none;
        font-family: inherit;
        padding: 0;
    }
`;