function addTag(tagName,tagColor){
    let $li = $('<li>');
    let $button = $("<button>", {
        'class': "btn btn-light delete",
        'type': "button",
    });
    $button.html("&#x2716;");
    let $span = $("<span>", {
        'class': "tagName",
    });
    $span.text(tagName);
    $li.append($button);
    $li.append($span);
    $("#currentTags").append($li);
    //
    tagColors[tagName] = tagColor;
    //
    let $div = $("<div>", {
        'class': "form-check-inline",
    })
    let $input = $("<input>", {
        'type': "radio",
        'name':"tag",
        'value':tagName,
        'class': "form-check-input"
    })
    let $label = $("<label>",{
        "class":"form-check-label"
    })
    $label.html(tagName);
    $div.append($input).append($label);
    $("#tags").append($div);
}