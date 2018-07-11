var autoComplite = {};

autoComplite = function() {
    
    this.minChars = 2;
    this.field = null;
    this.nameLoopId = 0;
    this.helper = null;
    this.helperContent = "";
}
autoComplite.prototype = {
    
    init:function(idOfTheField) {
        this.field = document.getElementById(idOfTheField);
        
        if (!this.field) {
            alert("Wrong input");
        } else {
            this.createHelper();
            this.field.onfocus = this.onFieldIn;
            this.field.onblur = this.onFieldOut;
        }
    },
    
    onFieldIn:function() {
        ac.loop();
    },

    onFieldOut:function() {
        clearTimeout(ac.nameLoopId);
        setTimeout("ac.hideHelper()", 600);
    },

    loop:function() {
        var list = "";
        var value = ac.field.value;

        if(value.length >= this.minChars) {
            for(var i = 0; i < markers.universities.length; i++) {
                if(value.toLowerCase() == markers.universities[i].Name.substr(0, value.length).toLowerCase()) {
                    list += '<a href="javascript:ac.setName(\'' + markers.universities[i].Name + '\');">' + markers.universities[i].Name + '</a>'
                }
            }
        }

        if(list != "") {
            if(this.helperContent != list) {
                this.helperContent = list;
                this.helper.innerHTML = this.helperContent;
            }
            this.showHelper();
        } else {
            this.hideHelper();
        }

        ac.nameLoopId = setTimeout("ac.loop()", 200);
    },

    setName:function(name) {
        this.field.value = name;
        this.hideHelper();
    },

    createHelper:function() {
        this.helper = document.createElement("div");
        this.helper.style.width = (this.field.offsetWidth - 30) + "px";
        this.helper.setAttribute("id", "helper");
        this.helper.innerHTML = "";

        document.body.appendChild(this.helper);
        this.positionHelper();
        this.hideHelper();
    },

    positionHelper:function() {
        var position = {x:0, y:0};
        var e = this.field;

        while(e) {
            position.x += e.offsetLeft;
            position.y += e.offsetTop;

            e = e.offsetParent;
        }

        this.helper.style.left = position.x + "px";
        this.helper.style.top = (position.y + this.field.offsetHeight) + "px";
    },

    showHelper:function() {
        this.helper.style.display = "block";
    },

    hideHelper:function() {
        this.helper.style.display = "none";
    }
}

var ac = new autoComplite();