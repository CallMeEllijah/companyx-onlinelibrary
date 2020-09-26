*** Settings ***
Documentation     A test suite with a test for temporary files to be transferred to another test suite
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Invalid Register 
    Initialize Register
    # Input Text    fName    Aaron
    # Input Text    lName    John 
    # Input Text    username AJ
    # Input Text    IDno     123456789
    # Input Username  axe@gmail.com
    # Input Password  123456
    # Input Text    password2     123456
    # Input Text    secA      none
    # click Button  xpath=//*[@id="root"]//div//div[2]//div//div//form//div[10]//button
    # Get Element Attribute  css=.input-field:nth-child(1) > .red-text  First Name field is required
    # Get Element Attribute  css=.input-field:nth-child(2) > .red-text  Last Name Name field is required
    # Get Element Attribute  css=.input-field:nth-child(3) > .red-text  Username field is required
    # Get Element Attribute  css=.input-field:nth-child(4) > .red-text  ID number field is required
    # Get Element Attribute  css=.input-field:nth-child(5) > .red-text  Email field is required
    # Get Element Attribute  css=.input-field:nth-child(6) > .red-text  Password must be at least 6 characters
    # Get Element Attribute  css=.input-field:nth-child(7) > .red-text  Confirm password field is required
    # Get Element Attribute  css=div:nth-child(8) > .red-text  Security Question field is required
    # Get Element Attribute  css=.input-field:nth-child(9) > .red-text  Security Answer field is required
    # Input Username    adminuser@test.test
    # Input Password    123456
    # click Button    xpath=//button[@type='submit']
    # Get Element Attribute  xpath=//p      Welcome to your dashboard
    # Get Element Attribute  xpath=//p    Admin
    # Sleep    2
    # click Button    xpath=//*[@id="root"]//div//div[2]//div//div//button[2]
    # Get Element Attribute  xpath=//h4  Register below
    Close Browser