function addTaskFromForm() {
    let taskInfo = {};
    $("#addTask").serializeArray().forEach(function (item) {
        taskInfo[item.name] = item.value;
    });
    taskInfo["tag"]= $('input[type=radio]:checked').val(); 
    myTasks.addNewTask(taskInfo);
}

function addTagFromForm () {
    let taskInfo = {};
    $("#addTagForm").serializeArray().forEach(function (item) {
        taskInfo[item.name] = item.value;
    });
    addTag(taskInfo["tagName"],taskInfo["typeColor"]);
}

function addUserFromForm() {
    let userInfo = {};
    $("#loginForm").serializeArray().forEach(function (item) {
        userInfo[item.name] = item.value;
    });
    do_login(userInfo["email"], userInfo["password"]);
}

$("#addTagButton").click(function(){
    addTagFromForm ();
    $("#addTagForm")[0].reset();
});

$("#addTaskButton").click(function(){
    addTaskFromForm();
    $("#addTask")[0].reset();
});

$("#addUserButton").click(function(){
    addUserFromForm();
    $("#loginForm")[0].reset();
});

$(document).on('click', ".markDone", function(event) {
    console.log("!");
    var id = $(event.target).closest('[data-taskId]').attr("data-taskId");
    id = parseInt(id);
    var t = myTasks.getTask(id);
    t.toggleDone();
});

$(document).on('click', ".delete", function(event) {
    var id = $(event.target).closest('[data-taskId]').attr("data-taskId");
    id = parseInt(id);
    myTasks.deleteTask(id);
    var t = myTasks.getTask(id);
    t.toggleDone();
    console.log("task complete: "+ t.complete);
});

//prevent addTask dropdown from closing
$( "#addTask" ).click(function( event ) {
    if (event.target.nodeName !== 'BUTTON'){
        event.stopPropagation();
    }
});

$( "#saveLocalButton").click(function() {
    myTasks.save();
});

$( "#loadLocalButton").click(function() {
    myTasks.load();
});

$( "#resetLocalButton" ).click( function() {
    localStorage.clear();
});

$( "#sortIdButton" ).click( function() {
    //console.log("1");
    myTasks.sort(compareById);
});

$( "#sortTagButton" ).click( function() {
    myTasks.sort(compareByTag);
});

$( "#sortDueDateButton" ).click( function() {
    myTasks.sort(compareByDueDate);
});

$("#sortPriorityButton" ).click(function() {
    myTasks.sort(compareByPriority);
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

$( "#saveCloudButton").click(function() {
    myTasks.saveToCloud();
});

$( "#loadCloudButton").click(function() {
    myTasks.loadToCloud();
});