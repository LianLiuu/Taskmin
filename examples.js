// ================================================================
// Task description dictionaries. Task descriptions have these instance
// variables, as shown in these examples:

var exampleTaskDescriptions =
    [
        {
            text: 'Finish Taskmin Project',
            priority: 'high',
            duedate: '12/15/2022',
            tag: 'work',
        },
        {
            text: 'send card to mom',
            priority: 'medium',
            duedate: '12/10/2022',
            tag: 'personal',
        },
        {
            text: 'Do CS 432 exam',
            priority: 'low',
            duedate: '12/12/2022',
            tag: 'work',
        },
        {
            text: 'pack for home',
            priority: 'high',
            duedate: '12/16/2022',
            tag: 'personal',
        }
    ];

// Note that the following variable name is not good for production code,
// but this shorthand is convenient for testing your code in the JS
// console.

var etd = exampleTaskDescriptions;

// ================

// Tasks get background colors by looking up the tagin the tagColors
// dictionary. If you have to re-set the value, when implementing
// dynamic tags, you can use the JSON.parse() trick.

var initialTagColors = '{"work":"#E9B490","personal":"#4DB6AC"}';

var tagColors = JSON.parse(initialTagColors);
tagColors["undefined"] = "#90c5e9";