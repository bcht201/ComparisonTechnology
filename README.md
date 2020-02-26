If there was more time for testing:

- Mock JSON response with prices to see if sorting works
- Check number of results being rendered


Additional task approach:
- Payment method
    - Create unique array of payment methods
    - Dropdown based on values of that array
    - Depending on the value of the dropdown, render list of results with same payment method

- Big six supplier
    - Go through results array, push result into a separate array if BigSix supplier
    - map array into render

- Exit fees apply
    - Similar approach to above