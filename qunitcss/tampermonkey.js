// ==UserScript==
// @name         Kontool Testing Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sly321 der Ficker
// @match        http://localhost:50019/*
// @require      https://code.jquery.com/qunit/qunit-2.0.0.js
// @resource     qunitCSS https://raw.githubusercontent.com/Sly321/Api-References/master/qunitcss/qunit.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

var qunit_css = GM_getResourceText ("qunitCSS");
GM_addStyle (qunit_css);

var modal = document.createElement("div");
modal.className = "modal fade";
modal.id = "debug-modal";

var modal_dialog = document.createElement("div");
modal_dialog.className = "modal-dialog";

var modal_content = document.createElement("div");
modal_content.className = "modal-content";

var modal_header = document.createElement("div");
modal_header.className = "modal-header";

var button_close = document.createElement("button");
button_close.className = "close";
button_close.type = "button";
button_close.setAttribute("data-dismiss", "modal");
button_close.setAttribute("aria-label", "Close");
button_close.innerHTML = "&times;";

var span = document.createElement("span");
span.setAttribute("aria-hidden", "true");

var title = document.createElement("h4");
title.className = "modal-title";
title.innerHTML = "QUnit Test";

var modal_body = document.createElement("div");
modal_body.className = "modal-body";

var qunit = document.createElement("div");
qunit.id = "qunit";

var qunit_fixture = document.createElement("div");
qunit_fixture.id = "qunit-fixture";

modal_body.appendChild(qunit);
modal_body.appendChild(qunit_fixture);

button_close.appendChild(span);

modal_header.appendChild(button_close);
modal_header.appendChild(title);

modal_content.appendChild(modal_header);
modal_content.appendChild(modal_body);
modal_dialog.appendChild(modal_content);
modal.appendChild(modal_dialog);

document.getElementsByTagName("Body")[0].appendChild(modal);

var buttonContainer           = document.createElement("div");
var buttonOpenDebugModal      = document.createElement("button");

buttonContainer.style.position = "absolute";
buttonContainer.style.top      = "100px";
buttonContainer.style.left     = "10px";
buttonContainer.style.maxWidth = "100px";

buttonOpenDebugModal.className      = "btn";

buttonOpenDebugModal.innerHTML            = "Debug";
buttonOpenDebugModal.style.width          = "100px";

buttonOpenDebugModal.style.background      = "#428bca";
buttonOpenDebugModal.style.color      = "white";

buttonOpenDebugModal.setAttribute("data-toggle", "modal");
buttonOpenDebugModal.setAttribute("data-target", "#debug-modal");

buttonContainer.appendChild(buttonOpenDebugModal);

document.getElementsByTagName("Body")[0].appendChild(buttonContainer);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* QUNIT Testin  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var site = document.title;

var GetSettingsAjax = function(callback) {
    var req = BuildValuesRequest("dfasourcesystemimport", "getsettings", null, "colmex", null, "r");
    ExecuteJson(req, callback);
};

var SourceSystemTests = function() {
    QUnit.module( "SourceSystem" );
    QUnit.test( "Test if class is defined: SourceSystemDialogModel", function( assert ) {
        assert.equal(typeof sourceSystemDialogModel, "object", "SourceSystemDialogModel exists");
        assert.equal(typeof sourceSystemDialogModel.systems, "object", "sourceSystemDialogModel.systems exists");
    });

    QUnit.test("Checking the system array", function( assert ) {
        var systemarray = sourceSystemDialogModel.systems;
        assert.equal(systemarray.length, 6, "Length correct");
    });

    QUnit.test("Collmex GetSettings Rquest", function( assert ) {
        var done = assert.async();
        GetSettingsAjax(function(json) {
            console.log(json);
            assert.ok(true);
            done();
        });
    });
};

if(site.indexOf("TOP-Sicht") >= 0) {
    QUnit.module( "Top-Sicht" );
    QUnit.test( "Test if class is defined: AnalysisOverview", function( assert ) {
        assert.equal(typeof AnalysisOverview, "object", "AnalysisOverview Class exists");
        assert.equal(typeof AnalysisOverview.kovModel, "object", "AnalysisOverview.kovModel exists");
    });

    SourceSystemTests();
} else if(site.indexOf("Planungs") >= 0) {
    QUnit.module( "Buchungssicht" );
    QUnit.test( "Test if class is defined: CDashboard", function( assert ) {
        assert.equal(typeof CDashboard, "object", "CDashboard Class exists");
    });

    SourceSystemTests();
} else if(site.indexOf("Buchungssicht") >= 0) {
    QUnit.module( "Buchungssicht" );
    QUnit.test( "Test if class is defined: CDashboard", function( assert ) {
        assert.equal(typeof CDashboard, "object", "CDashboard Class exists");
    });
    SourceSystemTests();
}

