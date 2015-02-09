(function () { var oHead = document.getElementsByTagName('HEAD').item(0); var oScript = document.createElement("script"); oScript.type = "text/javascript"; oScript.src = "http://localhost:50226/Script/interface.js?r=" + Math.random(); oHead.appendChild(oScript); })()


javascript: (function () { var oScript = document.createElement("script"); oScript.type = "text/javascript"; oScript.src = "http://localhost:50226/Script/interface.js"; oScript.onload = function () { alert("load"); } })()