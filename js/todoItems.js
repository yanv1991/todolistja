var people = (function() {
    var people = ['Will', 'Steve'];

    //cache DOM
    var button = document.getElementById("add-item-btn");
    var input = document.getElementById("item-txt");
    var ul = document.getElementById("items-list");

    //bind events
    button.addEventListener("click", addItem);
    // Get the element, add a click listener...
    ul.addEventListener("click", function(e) {
        // e.target is the clicked element!
        // If it was a list item
        if (e.target && e.target.nodeName == "I") {
            deletePerson(e);
        }
    });

    //display current list at render
    _render();

    function _insertElement(value) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var i = document.createElement("i");
        var text = document.createTextNode(value);
        var closeIcon = document.createTextNode("X");
        span.appendChild(text);
        i.appendChild(closeIcon);
        i.className = "del";
        li.appendChild(span)
        li.appendChild(i);
        ul.appendChild(li);
    }

    function _deleteElement(e) {
        var li = e.target.parentElement;
        ul.removeChild(li);
    }

    function _render() {
        for (var i = 0; i < people.length; i++) {
            _insertElement(people[i]);
        }
    }

    function addItem(value) {
        var name = (typeof value === "string") ? value : input.value;
        people.push(name);
        _insertElement(name);
        input.value = "";
    }

    function deletePerson(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var nodeList = Array.prototype.slice.call(ul.children);
            i = nodeList.indexOf(event.target.parentElement);
        }
        people.splice(i, 1);
        console.log(people)
        _deleteElement(event);
    }

    return {
        addItem: addItem,
        deletePerson: deletePerson
    };

})();

//people.addItem("Jake");
//people.deletePerson(0);
