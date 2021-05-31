![Apollo Foods Logo Banner](../images/LogoBanner.jpg)

# Dokumentation

Eine technische Beschreibung der Umsetzung (in der Sie die Struktur des Codes und
etwaige Besonderheiten beschreiben (z.B. in Worten, mit Diagrammen, Screenshots der
Ordnerstruktur, etc.)

## Lokales Entwickeln

Um Apollo Foods lokal ausführen zu können, verwendet man diese Kommandos:

```bash
npm install
npx next
```

Bitte wenden Sie sich an den Maintainer @motcodes, um alle nötigen API Keys, für die Anmelde Funktionen, sowie die URLs für die Datenbank zu bekommen. Danach ist es möglich das Prisma Studio auszuführen:

```bash
npx prisma studio
```

## Ordner Struktur

![Ordner Struktur Geschlossen](./FolderStructureClosed.png)

Die Ordner Struktur ist nach dem Prinzip eines typischen NextJs Projektes aufgebaut.

- .next/
  - ist eine Caching Ordner und dient zum schnellen Laden und Interpretieren des Codes
- components/
  - Besitzt, wie der Name schon sagt, alle benutzerdefinierten Komponenten.
  - Hier findet man Icons, sowie die Stage Komponente, welche für das Generieren der 3D Objekte zuständig ist.
- images/
  - Enthält Bilder und SVGs
- lib/
  - wird als Funktionen und React-Hooks Ordner verwendet
  - diese Funktionen können 3 oder mehr Zeilen aufweisen
  - dient vor allem dem Code-Splitting und der Leserlichkeit des Codes
  - alle Funktionen werden in der `index.js` Datei exportiert, so dass man in einer Komponente z.B. nur `../lib` aufrufen muss, um mehrerer Funktionen importieren zu können.
- node_modules/
  - Apollo Foods basiert auf NodeJs, daher der Package Ordner
- pages/
  - enthält alle "Seiten" die User besuchen kann
  - der Datei Name ist die Route
    - credits.jsx -> apollofoods.matthiasoberholzer.com/credits
  - im Kompilierungsprozess werden die Dateien, je nach Funktion, die die Seite erfüllt, bereits zu einem HTML-File erstellt. Das hilft der Performance und dem SEO
  - api/
    - diese Ordner umfasst alle API-Routen, wie das Speichern und Löschen von Benutzern
    - Die API greift auf die DB zu.
  - cook/[id].jsx
    - Die eckigen Klammern sind eine Eigenheit von NextJS
    - es wird der Inhalt von diesem File gerendert
    - für den User wird die `id` aufgelöst
      - cook/[id].jsx -> apollofoods.matthiasoberholzer.com/cook/52806
  - u/[username]/
    - Die eckigen Klammern sind eine Eigenheit von NextJS
    - es wird der Inhalt von dem `index.js` wird hier gerendert
    - für den User wird der `[username]` aufgelöst
      - u/[username]/index.jsx -> apollofoods.matthiasoberholzer.com/u/daveGrohl
    - Hier wird die Ordner Version dieses Verfahrens verwendet damit weiter Routen abhängig vom Benutzer gerendert werden können.
      - u/[username]/settings.jsx -> apollofoods.matthiasoberholzer.com/u/daveGrohl/settings
  - prisma
    - enthält das Datenbank Schema als `.prisma` Datei
    - beim Hochladen des Schemas wird es automatisch zu einem `.sql` umgewandelt
    - das `prisma.js` File dient als Singelton, um nicht jedes mal einen neuen Client zu eröffnen.
      - muss Server seitig importiert werden
      - bei Client seitigen Import tritt ein Fehler auf, darum findet man es im `prisma/` Ordner und nicht im `lib/` Ordner
  - public/
    - alles was im public Ordner ist wird dem Besucher beim Laden mitgeliefert und ist auch von der Domain aufrufbar
    - enthält favicon, manifest, font und das 3D-Pouch-Model
  - styles/
    - wird verwendet, um den lokalen Font zu laden
  - utils/
    - umfasst eine Reihe von UI-Elementen, wie Button, Input, Link, Typography ...
    - alle Dateien werden in einer `index.js` Datei gesammelt, um beim Importierne nur den Ordner referenzieren zu müssen.
  - .babelrc
    - ist die Konfigurationsdatei vom JS Compiler Babel
    - besitzt die Konfiguration, um Styled-Components Server Seitig zu laden.
  - .env
    - enthält vertrauliche API-Keys und die Domain zum Datenbanken Server
    - soll unter keinen Umständen an nicht autorisierte Personen weitergegeben werden
  - .gitignore
    - welche Dateien nicht an das Repository hochgeladen werden sollten.
  - next.config.js
    - ist die Konfigurationsdatei vom NextJs Framework
    - hier kann man Flags setzten
    - auch die Image-Provider werden hier angegeben, um nicht registrierte Bilder-Domain zu blockieren.
  - package-lock.json & package.json
    - ist die Konfigurationsdatei für NodeJs
    - enthält Informationen zum Projekt und eine List von Paketen, die verwendet werden.
  - prettier.config.js
    - ist die Konfigurationsdatei von Prettier
    - dient zur benutzerdefinierten Formatierung von Code Zeilen
  - README.md
    - Kurz Info zum Projekt

## Datenbank

### ER-Diagram

![Datenbank Schema](./prisma-erd.png)
Diagram wurde von [prisma-erd.simonknott.de](https://prisma-erd.simonknott.de/) generiert

### Beschreibung

Apollo Foods besitzt 4 Tables.

- Von NextAuth vorgegeben
  - Account
  - Session
  - VerificationRequest
  - NextAuth speichert in diesen Tabellen alle Informationen, die für das passwort-lose Anmelden benötigt werden
- Benutzerdefiniert
  - User
    - steht in einer indirekten Verbindung mit den obigen Tabellen
    - verwendet userId zur Erkennung
  - Meal
    - verwendet userId und das User Objekt zur Zuweisung

## 3D mit ThreeJs in React

Die Attraktion von Apollo Foods ist natürlich das 3D-Model. Dafür wird das WebGl Framework `ThreeJs` verwendet, des Weiteren werden auch noch die Libraries `@react-three/fiber` und `@react-three/drei` benutzt. Während `ThreeJs` alle Grundfunktionen für das Darstellen von 3D Inhalten im Web liefert, kümmern sich die Pakete von `@react-three` um eine einfach Nutzung dieser Funktionen, sowie die Möglichkeit zum Beispiel Meshes oder Lichter als `JSX` anzuschreiben.  
Hinter der Generierung des Beutels stecke trotzdem noch einige Prozessen.

1. Daten von der MealDB API holen
   - `pages/cook/[id].jsx`
2. HTML Etikett im Hintergrund mit den Daten befüllen, während User einen Loading Screen sieht
   - `pages/cook/[id].jsx`
   - `components/Label/`
3. HTML Node zu einem Canvas umwandeln und einen Abdruck des Canvas machen
   - `pages/cook/[id].jsx`
4. Bild zu einer 3D Textur parsen
   - `components/Pouch.jsx`
5. Auf das 3D Model laden, dazu wird ein `.gltf` File geladen, welches als 3D Model fungiert. Mit Hilfe von ThreeJS kann man externe Object ebenfalls im Web darstellen.
   - `components/Pouch.jsx`
6. Nachdem das 3D Model bereit ist, wird zusätzlich noch ein weiter Abdruck des Beutels gemacht, um es als Vorschaubild in `/expedtion` oder `/u/[username]` darzustellen.
   - `components/Stage/`
