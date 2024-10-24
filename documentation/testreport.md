# Test Report

Current test status:

|  Test   | Status | Note  |
|---------|--------|-------|
|  TC1.1  |   ✅   |       |
|  TC1.2  |   ✅   |       |
|  TC1.3  |   ✅   |       |
|  TC2.1  |   ✅   |       |
|  TC2.2  |   ✅   |       |
|  TC2.3  |   ✅   |       |
|  TC2.4  |   ✅   |       |
|  TC2.5  |   ✅   |       |
|  TC2.6  |   ✅   |       |
|  TC2.7  |   ✅   |       |

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
For all tests first do one step from any test case in UC1 (Open the editor) to enter the editor.

**TC2.1** - Add a data point with correct inputs.

**Input:** 
- Click the input field `name` in the `Input data` box.
- Enter 'test'
- Click the input field `value` in the `Input data` box.
- Enter '123'
- Press enter.

**Expected result:** The chart preview and data list above the selectors should update with the data point. the values disappears from the input fields.

**TC2.2** - Add a data point with no name.

**Input:** 
- Click the input field `name` in the `Input data` box.
- Enter 'test'
- Press enter.

**Expected result:** Nothing should be updated, the values in the input field stays.

**TC2.3** - Add a data point with no value.

**Input:** 
- Click the input field `value` in the `Input data` box.
- Enter '123'
- Press enter.

**Expected result:** Nothing should be updated, the values in the input field stays.

**TC2.4** - Change an existing data point.

**Input:** 
- First do the input for TC2.1
- Click the input field `name` in the `Update data` box.
- Enter 'test'
- Click the input field `new value` in the `Update data` box.
- Enter '321'
- Press enter.

**Expected result:** The preview should update both with the chart and the data list. The values in both fields should disappear.

**TC2.5** - Change a non existent data point.

**Input:** 
- First do the input for TC2.1
- Click the input field `name` in the `Update data` box.
- Enter 'unknown'
- Click the input field `new value` in the `Update data` box.
- Enter '321'
- Press enter.

**Expected result:** Nothing should happen with the preview. The values in both fields should disappear.

**TC2.6** - Delete an existing datapoint

**Input:** 
- First do the input for TC2.1
- Click the input field `name` in the `Delete data` box.
- Enter 'test'
- Click the input field `value` in the `Delete data` box.
- Enter '123'
- Press enter.

**Expected result:** The preview should update with the datapoint removed, both from the chart and data list. The values in both fields should disappear.

**TC2.7** -  Change a non existent data point.

**Input:**
- First do the input for TC2.1
- Click the input field `name` in the `Delete data` box.
- Enter 'test123'
- Click the input field `value` in the `Delete data` box.
- Enter '123'
- Press enter.

**Expected result:** Nothing should happen with the preview. The values in both fields should disappear.

## UC3 Deleting a graph/chart

**TC3.1** -

**Input:**

**Expected result:**

## UC4 Saving a graph/chart

**TC4.1** -

**Input:**

**Expected result:**

## UC5 Downloading a graph/chart

**TC5.1** -

**Input:**

**Expected result:**