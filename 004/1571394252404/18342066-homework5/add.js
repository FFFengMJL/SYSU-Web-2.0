window.onload = function () {
    var operation = '';
    document.getElementById("one").onclick = function () {
        operation = operation + '1';
        document.getElementById("output").value = operation;
    }

    document.getElementById("two").onclick = function () {
        operation = operation + '2';
        document.getElementById("output").value = operation;
    }

    document.getElementById("three").onclick = function () {
        operation = operation + '3';
        document.getElementById("output").value = operation;
    }

    document.getElementById("four").onclick = function () {
        operation = operation + '4';
        document.getElementById("output").value = operation;
    }

    document.getElementById("five").onclick = function () {
        operation = operation + '5';
        document.getElementById("output").value = operation;
    }

    document.getElementById("six").onclick = function () {
        operation = operation + '6';
        document.getElementById("output").value = operation;
    }
    document.getElementById("seven").onclick = function () {
        operation = operation + '7';
        document.getElementById("output").value = operation;
    }

    document.getElementById("eight").onclick = function () {
        operation = operation + '8';
        document.getElementById("output").value = operation;
    }

    document.getElementById("nine").onclick = function () {
        operation = operation + '9';
        document.getElementById("output").value = operation;
    }

    document.getElementById("zero").onclick = function () {
        operation = operation + '0';
        document.getElementById("output").value = operation;
    }

    document.getElementById("add").onclick = function () {
        operation = operation + '+';
        document.getElementById("output").value = operation;
    }

    document.getElementById("sub").onclick = function () {
        operation = operation + '-';
        document.getElementById("output").value = operation;
    }

    document.getElementById("multiply").onclick = function () {
        operation = operation + '*';
        document.getElementById("output").value = operation;
    }

    document.getElementById("divide").onclick = function () {
        operation = operation + '/';
        document.getElementById("output").value = operation;
    }

    document.getElementById("left-bracket").onclick = function () {
        operation = operation + '(';
        document.getElementById("output").value = operation;
    }

    document.getElementById("right-bracket").onclick = function () {
        operation = operation + ')';
        document.getElementById("output").value = operation;
    }

    document.getElementById("point").onclick = function () {
        operation = operation + '.';
        document.getElementById("output").value = operation;
    }

    document.getElementById("clear").onclick = function () {
        operation = '';
        document.getElementById("output").value = operation;
    }

    document.getElementById("delete").onclick = function () {
        operation = operation.substring(0, operation.length - 1);
        document.getElementById("output").value = operation;
    }

    document.getElementById("equal").onclick = function () {
        try {
            operation = eval(operation);
            document.getElementById("output").value = operation;
        }
        catch(exception) {
            window.alert("Error input");
        }
    }
}