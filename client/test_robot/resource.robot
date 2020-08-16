*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${URL}         https://shrouded-tor-61207.herokuapp.com/
${BROWSER}        chrome
${DELAY}          0
${VALID USER}     test1@test.test
${VALID PASSWORD}    123456
${LOGIN URL}      https://shrouded-tor-61207.herokuapp.com/login
${REGISTER URL}    https://shrouded-tor-61207.herokuapp.com/register


*** Keywords ***
Welcome Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Home Page Should Be Open

Home Page Should Be Open
    Get Element Attribute  css=h3    Company X : an online library platform

Input Username
    [Arguments]    ${username}
    Input Text    email    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}



