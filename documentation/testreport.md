# Test Report

Current test status:

|  Test   | Status |                          Description                         |
|---------|--------|--------------------------------------------------------------|
|  TC1.1  |   ✅   | Create a pie chart.                                          |
|  TC1.2  |   ✅   | Create a column chart.                                       |
|  TC1.3  |   ✅   | Create a line chart.                                         |
|  TC2.1  |   ✅   | Add a data point with correct inputs.                        |
|  TC2.2  |   ✅   | Add a data point with no name.                               |
|  TC2.3  |   ✅   | Add a data point with no value.                              |
|  TC2.4  |   ✅   | Change an existing data point.                               |
|  TC2.5  |   ✅   | Change a non existent data point.                            |
|  TC2.6  |   ✅   | Delete an existing datapoint.                                |
|  TC2.7  |   ✅   | Change color theme.                                          |
|  TC2.8  |   ✅   | Change width.                                                |
|  TC2.9  |   ✅   | Change width with invalid input.                             |
| TC2.10  |   ✅   | Change height.                                               |
| TC2.11  |   ✅   | Change height with invalid input.                            |
|  TC3.1  |   ✅   | Save a chart/graph from the editor.                          |
|  TC3.2  |   ✅   | Create and download a graph/chart from the editor.           |
|  TC3.3  |   ✅   | Create and download a graph/chart from the Saved Graph page. |
|  TC3.4  |   ✅   | Create and delete a graph/chart from the Saved Graph page.   |


## Manual testing
Manual testing is more appropiate for this application, each use case handles a different functionality in the application and they are all tested both on a local server during development but also when the application is launched since it will be launched (and connected to the GitHub repo with auto updating) from the start of the development.

## UC1 Open the editor

**TC1.1** - Create a pie chart.

**Input:** Click the pie chart icon on the starting page.

**Expected result:** An editor should open up where the user can enter, update or delete datapoints, change size and color of the chart.

**TC1.2** - Create a column chart.

**Input:** Click the column chart icon on the starting page.

**Expected result:** An editor should open up where the user can enter, update or delete datapoints, change size and color of the chart.

**TC1.3** - Create a line chart.

**Input:** Click the line chart icon on the starting page.

**Expected result:** An editor should open up where the user can enter, update or delete datapoints, change size and color of the chart.

## UC2 Creating/Customizing a graph/chart

**TC2.1** - Add a data point with correct inputs.

**Input:** 
- Do TC1.1, 1.2 or 1.3 to open the editor
- Click the input field `name` in the `Input data` box.
- Enter 'test'
- Click the input field `value` in the `Input data` box.
- Enter '123'
- Press enter.

**Expected result:** The chart preview and data list above the selectors should update with the data point. the values disappears from the input fields.

**TC2.2** - Add a data point with no name.

**Input:** 
- Do TC1.1, 1.2 or 1.3 to open the editor
- Click the input field `name` in the `Input data` box.
- Enter 'test'
- Press enter.

**Expected result:** Nothing should be updated, the values in the input field stays.

**TC2.3** - Add a data point with no value.

**Input:** 
- Do TC1.1, 1.2 or 1.3 to open the editor
- Click the input field `value` in the `Input data` box.
- Enter '123'
- Press enter.

**Expected result:** Nothing should be updated, the values in the input field stays.

**TC2.4** - Change an existing data point.

**Input:** 
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the input field `name` in the `Update data` box.
- Enter 'test'
- Click the input field `new value` in the `Update data` box.
- Enter '321'
- Press enter.

**Expected result:** The preview should update both with the chart and the data list. The values in both fields should disappear.

**TC2.5** - Change a non existent data point.

**Input:** 
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the input field `name` in the `Update data` box.
- Enter 'unknown'
- Click the input field `new value` in the `Update data` box.
- Enter '321'
- Press enter.

**Expected result:** Nothing should happen with the preview. The values in both fields should disappear.

**TC2.6** - Delete an existing datapoint

**Input:** 
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the input field `name` in the `Delete data` box.
- Enter 'test'
- Click the input field `value` in the `Delete data` box.
- Enter '123'
- Press enter.

**Expected result:** The preview should update with the datapoint removed, both from the chart and data list. The values in both fields should disappear.

**TC2.7** - Change color theme.

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the red color.
- Click the green color.
- Click the blue color.
- Click the yellow color.

**Expected result:** The chart/graph preview should update with the themes in the order red, green, blue, yellow.

**TC2.8** - Change width.

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the input field `width` in the size box.
- Enter '450'
- Press enter.

**Expected result:** The chart/graph preview should update and change to 450 pixels wide.

**TC2.9** - Change width with invalid input

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Click the input field `width` in the size box.
- Enter '30000'
- Press enter.

**Expected result:** Nothing should happen with the preview, max width should be 600 pixels.

**TC2.10** - Change height

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Click the input field `height` in the size box.
- Enter '250'
- Press enter.

**Expected result:** The chart/graph preview should update and change to 250 pixels high.

**TC2.11** - Change height with invalid input

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Click the input field `height` in the size box.
- Enter '30000'
- Press enter.

**Expected result:** Nothing should happen with the preview, max height should be 600 pixels.

## UC3 Create, Save and delete a graph/chart

**TC3.1** - Save a chart/graph from the editor.

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the `save` button

**Expected result:** The chart should be saved and can be viewed in the 'Saved graphs' page.

**TC3.2** - Create and download a graph/chart from the editor.

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the `Download` button

**Expected result:** The download should start and download a PNG image of the chart/graph onto your computer (should be shown both in the download tab of the browser and in your downloads folder on your computer)

**TC3.3** - Create and download a graph/chart from the Saved Graph page.

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the `Save` button
- Click the `Saved Graphs` navigation button.
- Click the `Download` button for the chart.

**Expected result:** The download should start and download a PNG image of the chart/graph onto your computer (should be shown both in the download tab of the browser and in your downloads folder on the computer)

**TC3.4** - Create and delete a graph/chart from the Saved Graph page.

**Input:**
- Do TC1.1, 1.2 or 1.3 to open the editor
- Do TC2.1 to add some data.
- Click the `Save` button
- Click the `Saved Graphs` navigation button.
- Click the `Delete` button for the chart.

**Expected result:** The chart should be deleted from the localstorage and the page should update without the deleted chart.
