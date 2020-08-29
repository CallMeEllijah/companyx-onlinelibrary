*** Settings ***
Documentation     A test suite with a test for Login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Login
    Initialize Login
    Input Username    test1@test.test
    Input Password    123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  xpath=//p      Welcome to your dashboard
    Close Browser


Invalid Email1
    Initialize Login
    Input Username  test
    Input Password  123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(1) > .red-text      Email is invalid
    Close Browser

Invalid Email2
    Initialize Login
    Input Username  test@test.test
    Input Password  123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(1) > .red-text      Email is invalid
    Close Browser

Invalid Password
    Initialize Login
    Input Username  test1@test.test
    Input Password  qwe123
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(2) > .red-text      Password incorrect
    Close Browser


No Email
    Initialize Login
    Input Password  123456
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(1) > .red-text      Email field is required
    Close Browser

No Password Valid Email
    Initialize Login
    Input Username  test1@test.test
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(2) > .red-text      Password field is required
    Close Browser

No Password Unknown Email
    Initialize Login
    Input Username  test@test.test
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(2) > .red-text      Password field is required
    Close Browser

No Password Invalid Email
    Initialize Login
    Input Username  test@test.test
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(1) > .red-text      Email is invalid
    Close Browser
    

No Email and Password
    Initialize Login
    click Button    xpath=//button[@type='submit']
    Get Element Attribute  css=.input-field:nth-child(1) > .red-text      Email field is required
    Get Element Attribute  css=.input-field:nth-child(2) > .red-text      Password field is required
    Close Browser