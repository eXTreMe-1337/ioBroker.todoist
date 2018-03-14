/* jshint -W097 */// jshint strict:false
/*jslint node: true */

"use strict";
var utils       = require(__dirname + '/lib/utils'); // Get common adapter utils
var request     = require('request');
var lang = 'de';

var adapter = utils.adapter({
    name:           'todoist',
    systemConfig:   true,
    useFormatDate:  true
});

var optinReset = false;
var optinNoLog = false;

adapter.on('ready', function () {
    //adapter.getForeignObject('system.config', function (err, data) {
        //if (data && data.common) {
        //    lang  = data.common.language;
        //}

        writeLog("initializing objects","debug");
        main();
    //});
});

function writeLog(logtext,logtype) { // wenn optinNoLog TRUE keine Ausgabe bei info, warn und debug, nur bei error
    if (!optinNoLog) { // Ausgabe bei info, debug und error
        if (logtype === "silly") adapter.log.silly(logtext);
        if (logtype === "info") adapter.log.info(logtext);
        if (logtype === "debug") adapter.log.debug(logtext);
        if (logtype === "warn") adapter.log.warn(logtext);
        if (logtype === "error") adapter.log.error(logtext);
    } else { // Ausgabe nur bei error
        if (logtype === "error") adapter.log.error(logtext);
    }
}
function readData() {
	var APIprojectsURL = "https://beta.todoist.com/API/v8/projects?token="+adapter.config.apikey;
	var APItaskURL = "https://beta.todoist.com/API/v8/tasks?token="+adapter.config.apikey;
    var ToDoListen = []; // wird mit IDs der TO-DO Listen befuellt
    var ToDoListen_names = []; // wird mit Namen der TO-DO Listen befuellt
    request(APIprojectsURL, function (error, response, body) {
		try {
			var projects_json = JSON.parse(body);
			var k = 0;
			for (k = 0; k < projects_json.length; k++) {
				var projects = parseInt(projects_json[k].id);
				var projects_name = JSON.stringify(projects_json[k].name);
				projects_name = projects_name.replace(/\"/g, ""); //entfernt die Anfuehrungszeichen aus dem Quellstring
				ToDoListen[ToDoListen.length] = projects;
				ToDoListen_names[ToDoListen_names.length] = projects_name;
				var Listenname = ToDoListen_names[k]
				adapter.setObjectNotExists('Lists.'+Listenname, {def: 'false',type: 'string',role: 'html',name: Listenname+' HTML String'});
				writeLog("Datenpunkt "+Listenname+" erstellt.", "info");
			}
		}
		catch(err) {
			writeLog("Fehler beim Einlesen der Listen: "+err, "error");
		}
    
    });
	writeLog("DEBUG: 1", "debug");
    setTimeout(function() {
		writeLog("DEBUG: 2", "debug");
		request(APItaskURL, function (error, response, body) {
			try {
				writeLog("DEBUG: 3", "debug");
				var json = JSON.parse(body);
				var j = 0;
				for (j = 0; j < ToDoListen.length; j++) {
					writeLog("DEBUG: 4", "debug");
					var HTMLstring = "";
					adapter.setState('Lists.'+ToDoListen_names[j], {ack: true, val: "empty"});
					var i = 0;
					for (i = 0; i < json.length; i++) {
						writeLog("DEBUG: 5", "debug");
						var Liste = parseInt(json[i].project_id);
						var content = JSON.stringify(json[i].content);
						content = content.replace(/\"/g, ""); //entfernt die Anfuehrungszeichen aus dem Quellstring
						content = content[0].toUpperCase() + content.substring(1); // Macht den ersten Buchstaben des strings zu einem Grossbuchstaben
						var taskurl = JSON.stringify(json[i].url);
						taskurl = taskurl.replace(/\"/g, "");
						writeLog("DEBUG: content = "+content+" und Liste = "+Liste, "debug");
						if (Liste == ToDoListen[j])
						{
							writeLog("["+content+"] in "+ToDoListen_names[j]+" gefunden", "info");
							HTMLstring = HTMLstring+"<tr><td><li><a href=\""+taskurl+"\" target=\"_blank\">"+content+"</a></li></td></tr>";
							adapter.setState('Lists.'+ToDoListen_names[j], {ack: true, val: "<table><ul>"+HTMLstring+"</ul></table>"});
						}
					}
				}
			}
			catch(err) {
				writeLog("Fehler beim Einlesen der Tasks: "+err, "error");
			}
		});
	}, 5000);
    adapter.stop();
}

function readSettings() {
    //APIKEY
    writeLog("API Key Länge: " + (adapter.config.apikey?adapter.config.apikey.length:0) + " Zeichen", "debug");
    if (adapter.config.apikey === undefined) {
        writeLog("No API-Key found.","error");
        return; // abbruch
    } else if (adapter.config.apikey.length < 40) {
        writeLog("API-Key too short, should be 40 digits.", "error");
        return; // abbruch
    } else if (adapter.config.apikey.length > 40) {
        writeLog("API-Key too long, should be 40 digits.", "error");
        return; // abbruch
    } else {
		readData();
    }
    // noLog
    optinNoLog = adapter.config.noLogs; // wichtig für function writeLog()
}

function main() {
    readSettings();
    setTimeout(function () {
        writeLog("force terminating adapter after 30 seconds", "debug");
        adapter.stop();
    }, 30000);
}
