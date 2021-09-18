<template>
    <router-view />
</template>

<style lang="scss">
@import './styles/variables';

*, *:before, *:after {
    box-sizing: border-box;
}

button, input {
    font: inherit;
}

html, body {
    min-height: 100%;
    height: 100%;
}

body {
    background: $background-color;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
    display: flex;
    min-height: 100%;
    flex-direction: column;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 960px;
    max-width: 100%;
    margin: 0 auto;
}

.ui-button {
    display: inline-block;
    padding: 1.25rem 2rem;
    min-width: 3.25rem;
    color: #fff;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.26px;
    border-radius: 36px;
    border: 0;
    outline: 0;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background: $color-active;
    transition: 700ms cubic-bezier(0.17, 0.67, 0, 1.01);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgb(0, 0, 0, 0.06);

    &:hover {
        transform: translateY(-4px);
    }

    &:active {
        background: darken($color-active, 4%);
        transform: translateY(4px);
    }

    &[disabled] {
        background: #bbb;
        cursor: default;
        transform: none;
    }
}
</style>
