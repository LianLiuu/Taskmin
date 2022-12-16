var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];


class Task {
    taskID;
    taskName;
    priority;
    dueDate;
    tag;
    complete;
    $li;

    constructor (dictionary) {
        this.taskName = dictionary.text;
        this.priority = dictionary.priority;
        let [year,month,day] = dictionary["duedate"].split('-');
        this.dueDate = new Date (+year, + month-1, +day);
        this.tag = dictionary.tag;
        this.complete = false;
        if ("id" in dictionary){
            this.taskID = dictionary["id"];
        }else{
            this.taskID = null;
        }
    }

    getFormattedDueDate () {
        const year = this.dueDate.getFullYear()
        const month = this.dueDate.getMonth();
        const day = this.dueDate.getDate();
        const name = this.dueDate.getDay();
        const current_date = days[name] + " " + months[month] + " " + day + " " + year;
        return current_date;
    }

    addToDom (destination) {
        console.log(this);
        this.$li = $('<li>', {
            'class': 'task',
            'data-taskId': this.taskID,
            'style': "background-color: " + tagColors[this.tag],
        });
        //
        let $spanID = $('<span>', {
            'class':'id',
        });
        $spanID.text(this.taskID + " ");
        this.$li.append($spanID);
        //
        let $spanDue = $('<span>',{
            'class':'due',
        });
        $spanDue.text(this.getFormattedDueDate() + " ");
        this.$li.append($spanDue);
        //
        let $spanPriority = $('<span>',{
            'class':'priority',
        });
        $spanPriority.text(this.priority + " ");
        this.$li.append($spanPriority);
        //
        let $spanTag = $('<span>',{
            'class':'tag',
        });
        $spanTag.text(this.tag + " ");
        this.$li.append($spanTag);
        let $taskDescription = $('<p>',{
            'class':"text",
        });
        $taskDescription.text(this.taskName + " ");
        this.$li.append($taskDescription);
        
        let $doneButton = $('<button>', {
            'type': 'button',
            'class': "btn btn-light markDone",
        })
        $doneButton.html("&#x2714;");
        this.$li.append($doneButton);
        let $deleteButton = $('<button>', {
            'type': 'button',
            'class': "btn btn-light delete",
        })
        $deleteButton.html("&#x2716;");
        this.$li.append($deleteButton);
        $(destination).append(this.$li);
    }
    
    getTaskName() {
        return this.taskName;
    }
    getTag() {
        return this.tag;
    }
    getId() {
        return this.taskID;
    }
    getDueDate() {
        return this.dueDate;
    }
    getPriority() {
        return this.priority;
    }
    getDom () {
        return this.$li;
    }
    setID(id) {
        this.taskID = id;
    }
    
    toggleDone() {
        if (this.complete == false) {
            this.$li.addClass("done");
            this.complete = true;
        }else {
            this.$li.removeClass("done");
            this.complete = false;
        }
    }
    delete () {
        $("#theTasks").find('[data-taskId="'+ this.taskID + '"]').remove();
    }
    toString () {
        
    }
}