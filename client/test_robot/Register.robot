Documentation     A test suite with rests for invalid Registration
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Invalid Register No Input
    Initialize Register
    click Button  xpath=//*[@id="root"]//div//div[2]//div//div//form//div[10]//button
    Get Element Attribute  css=.input-field:nth-child(1) > .red-text  First Name field is required
    Get Element Attribute  css=.input-field:nth-child(2) > .red-text  Last Name Name field is required
    Get Element Attribute  css=.input-field:nth-child(3) > .red-text  Username field is required
    Get Element Attribute  css=.input-field:nth-child(4) > .red-text  ID number field is required
    Get Element Attribute  css=.input-field:nth-child(5) > .red-text  Email field is required
    Get Element Attribute  css=.input-field:nth-child(6) > .red-text  Password must be at least 6 characters
    Get Element Attribute  css=.input-field:nth-child(7) > .red-text  Confirm password field is required
    Get Element Attribute  css=div:nth-child(8) > .red-text  Security Question field is required
    Get Element Attribute  css=.input-field:nth-child(9) > .red-text  Security Answer field is required
    Close Browser