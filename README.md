![Logo](admin/todoist.png)
# ioBroker.todoist
=========================

[![NPM version](http://img.shields.io/npm/v/iobroker.todoist.svg)](https://www.npmjs.com/package/iobroker.todoist)
[![Downloads](https://img.shields.io/npm/dm/iobroker.todoist.svg)](https://www.npmjs.com/package/iobroker.todoist)
[![Tests](http://img.shields.io/travis/eXTreMe-1337/ioBroker.todoist/master.svg)](https://travis-ci.org/eXTreMe-1337/ioBroker.todoist)

[![NPM](https://nodei.co/npm/iobroker.todoist.png?downloads=true)](https://nodei.co/npm/iobroker.todoist/)

[Deutsch](#beschreibung)

## Description
:en: This adapter creates data points with HTML code for integrating todoist to-do lists into VIS using the basic string (unescaped) widget. A separate data point is created per list.

## settings
### API key
The necessary API token can be found on https://todoist.com in the settings under the item Integrations The 40-digit string must be entered here.

### minimize log
In order to minimize write access in the log (for example to sensitive SD cards), a check mark can be set.

## Activation
The adapter starts every 60sec.

## data points
A separate data point with html code for integration into VIS is created per to-do list with the aid of the basic string (unescaped) widget.
![alt text](img/todoscriptobjects.png "Datapoints")


## VIS usage
The respective created data points can be integrated in VIS with the basic string (unescaped) widget. Simply specify the data point of the respective list in ObjectID in the widget settings.
![alt text](img/todoistVIS.png "VIS")

With the help of CSS, the link color and the link text decoration can be changed. An example:

```
 /* unvisited link */
a:link {
    color: white;
    text-decoration: none;
}

/* visited link */
a:visited {
    color: white;
    text-decoration: none;
}

/* mouse over link */
a:hover {
    color: white;
    text-decoration: none;
}

/* selected link */
a:active {
    color: white;
    text-decoration: none;
}
```

## Beschreibung
:de: Dieser Adapter erstellt Datenpunkte mit HTML Code zur Einbindung der To-Do-Listen von todoist.com in VIS mit Hilfe des basic String (unescaped) Widgets. Pro Liste wird ein eigenener Datenpunkt erstellt.

## Einstellungen
### API-Key
Den notwendigen API Token findet man auf https://todoist.com in den Einstellungen unter dem Punkt Integrationen Die 40stellige Zeichenkette muss hier eingetragen werden.

### Log minimieren
Um Schreibzugriffe im Log (z.B. auf empfindliche SD-Karten) zu minimieren, kann ein Haken gesetzt werden.

## Aktivierung
Der Adapter startet alle 60sec. 

## Datenpunkte
Pro To-Do-Liste wird ein eigener Datenpunkt mit html Code zur Einbindung in VIS mit Hilfe des basic String (unescaped) Widgets angelegt.
![alt text](img/todoscriptobjects.png "Datenpunkte")


## VIS Nutzung
Die jeweils erstellten Datenpunkte können in VIS mit dem basic String (unescaped) Widget eingebunden werden. Einfach die den Datenpunkt der jeweiligen Liste bei ObjektID in den Widgeteinstellungen angeben.
![alt text](img/todoistVIS.png "VIS")

Mit Hilfe von CSS kann die Linkfarbe und die Link-Textdecoration geändert werden. Ein Beispiel:

```
 /* unvisited link */
a:link {
    color: white;
    text-decoration: none;
}

/* visited link */
a:visited {
    color: white;
    text-decoration: none;
}

/* mouse over link */
a:hover {
    color: white;
    text-decoration: none;
}

/* selected link */
a:active {
    color: white;
    text-decoration: none;
} 
```

## Changelog
### 0.1.0 (2018-03-13)
* (eXTreMe) Adapter created (Vorlage war der Tankerkönig Adapter von pix)

## License

The MIT License (MIT)

Copyright (c) 2018 eXTreMe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
