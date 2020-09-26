*** Settings ***
Documentation     A test suite with a test for temporary files to be transferred to another test suite
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Login Admin Display Profile
    Initialize Login
    Input Username    adminuser@test.test
    Input Password    123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  xpath=//p      Welcome to your dashboard
    Get Element Attribute  xpath=//p    Admin
    Sleep    2
    click Button    xpath=//*[@id="root"]//div//div[2]//div//div//button[2]
    Get Element Attribute  xpath=//h4  Register below
    Close Browser