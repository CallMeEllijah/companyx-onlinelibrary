*** Settings ***
Documentation     A test suite with tests for navigating pages.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Browse Books (Check Book Info)
    Welcome Page
    Sleep    2
    click Link    xpath=//*[@id="root"]//div//div[2]//div//div//div[2]//a
    Sleep    2
    click Link    xpath=//*[@id="root"]//div//div[2]//div[2]//div//div[2]//div//div//table//tbody//tr//td[2]//div//a
    Get Element Attribute  xpath=//b      Book Test
    Sleep    2
    Close Browser
    
Valid Login Student Browse Books (Check Book Info)
    Initialize Login
    Input Username    studentuser@test.test
    Input Password    123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  xpath=//p      Welcome to your dashboard
    Sleep    2
    click Button    xpath=//*[@id="root"]//div//div[2]//div//div//button[2]
    Sleep    2
    click Link    xpath=//*[@id="root"]//div//div[2]//div[2]//div//div[2]//div//div//table//tbody//tr//td[2]//div//a
    Get Element Attribute  xpath=//b      Book Test
    Sleep    2
    Close Browser
    