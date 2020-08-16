*** Settings ***
Documentation     A test suite with a test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Login
    Welcome Page
    click Link  css=.col:nth-child(9) > .btn
    Get Element Attribute  css=h4    Login below
    Input Username    test1@test.test
    Input Password    123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  xpath=//p      Welcome to your dashboard
    Log  Test executed by %{username} on %{os}