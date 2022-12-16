function compareById (a,b) {
    return a.getId() - b.getId();
}

function compareByDueDate (a,b) {
    if (a.getDueDate().getTime() < b.getDueDate().getTime()){
        return -1;
    }else if (a.getDueDate().getTime() == b.getDueDate().getTime()){
        return 0;
    }else {
        return 1;
    }
}

function compareByTag (a,b) {
    let tagA = a.getTag();
    let tagB = b.getTag();
    return tagA.localeCompare(tagB);
}

var priority = {"high":1,"medium":2,"low":3}

function compareByPriority (a,b) {
    let priorityA = priority[a.getPriority()];
    let priorityB = priority[b.getPriority()];
    return priorityA - priorityB;
}

class TaskList {
    key;
    dom;
    counter;
    list;
    tags;
    constructor (key, dom) {
        this.key = key;
        this.dom = dom;
        this.list = [];
        this.counter = 1;
        this.tags = [];
    }

    addNewTask(description) {
        let t = new Task (description);
        t.setID(this.counter);
        this.list.push(t);
        t.addToDom(this.dom);
        this.counter +=1;
        if (t.getTag() != undefined) {
            if (! this.tags.includes(t.getTag())) {
                this.tags.push(t.getTag());
            }
        }
    }

    addSavedTask(description) {
        let t = new Task (description);
        this.list.push(t);
        t.addToDom(this.dom);
        this.counter +=1;
        if (t.getTag() != undefined) {
            if (! this.tags.includes(t.getTag())) {
                this.tags.push(t.getTag());
            }
        }
    }

    getTask(tid) {
        let list = this.list;
        let tempTask = null;
        list.forEach(function (task) {
            if (task.getId() === tid) {
                tempTask = task;
            }
        });
        return tempTask;
    }
    
    deleteTask(tid) {
        let list = this.list;
        list.forEach(function (task) {
            if (task.getId() === tid) {
                task.delete();
            }
        });
    }

    save() {
        let list = this.list;
        let allTasks = [];
        list.forEach(function (task) {
            let description = {};
            description["text"] = task.getTaskName();
            description["priority"] = task.getPriority();
            const year = task.getDueDate().getFullYear()
            const month = task.getDueDate().getMonth()+1;
            const day = task.getDueDate().getDate();
            const dateString = year+"-"+month+"-"+day;
            description["duedate"] = dateString;
            description["tag"] = task.tag;
            description["id"] = task.getId();
            allTasks.push(description);
        });
        let allTasksDescription = JSON.stringify(allTasks);
        localStorage.setItem(this.key, allTasksDescription); 
    }

    load() {
        $("#theTasks").empty();
        this.list = [];
        this.counter = 1;
        let allTasks = localStorage.getItem(this.key);
        let allTasksArray = JSON.parse(allTasks);
        allTasksArray.forEach(function (task) {
            myTasks.addSavedTask(task);
        });
    }

    sort (cmp) {
        this.list.sort(cmp);
        let list = this.list;
        $("#theTasks").empty();
        list.forEach(function(task){
            task.addToDom("#theTasks");
            if (task.complete == true) {
                task.$li.addClass("done");
            }
        });
    }
    
    saveToCloud () {
        let list = this.list;
        let allTasks = [];
        list.forEach(function (task) {
            let description = {};
            description["text"] = task.getTaskName();
            description["priority"] = task.getPriority();
            const year = task.getDueDate().getFullYear()
            const month = task.getDueDate().getMonth()+1;
            const day = task.getDueDate().getDate();
            const dateString = year+"-"+month+"-"+day;
            description["duedate"] = dateString;
            description["tag"] = task.tag;
            description["id"] = task.getId();
            allTasks.push(description);
        });
        let allTasksDescription = JSON.stringify(allTasks);
        setItem(this.key, allTasksDescription, checkError); 
    }

    loadToCloud() {
        $("#theTasks").empty();
        this.list = [];
        this.counter = 1;
        let allTasksArray = []
        getItem(this.key,(item) => {
            console.log(item.value);
            allTasksArray = JSON.parse(item.value);
            this.callBack(allTasksArray);
        });
    }
    
    callBack (array) {
        array.forEach(function (task) {
            myTasks.addSavedTask(task);
        });
    }
}

var myTasks = new TaskList ("Lian", "#theTasks");
