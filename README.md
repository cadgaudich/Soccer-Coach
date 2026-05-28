# Coach — Jugendfußball-Trainerassistent

Lokale Web-App für Jugendfußball-Trainer und Kids: Termine, Übungen, Spielzüge (mit Animation), Trainingspläne.

Läuft als PWA — kann auf Handy/Tablet "wie eine App" installiert werden.

## Live-URL

Nach dem GitHub-Pages-Setup: `https://DEIN-USERNAME.github.io/coach/Coach.html`

## Installation auf dem Handy (Eltern/Trainer)

**Android (Chrome):**
1. URL im Browser öffnen
2. Drei-Punkte-Menü → "App installieren" oder "Zum Startbildschirm hinzufügen"
3. Bestätigen — Icon erscheint auf dem Homescreen

**iPhone (Safari):**
1. URL im Browser öffnen
2. Teilen-Symbol unten → "Zum Home-Bildschirm"
3. Bestätigen

## Deploy auf GitHub Pages

### Erstmaliges Setup

1. **Repo anlegen** auf github.com → "New repository" → Name z.B. `coach` → Public → Create
2. **Dateien hochladen:** alle Dateien aus diesem Ordner ins Repo (drag & drop im Browser oder via Git)
3. **GitHub Pages aktivieren:**
   - Repo öffnen → Settings → Pages (linke Seitenleiste)
   - Source: "Deploy from a branch"
   - Branch: `main` / Folder: `/ (root)`
   - Save
4. Nach 1-2 Minuten ist die URL aktiv: `https://DEIN-USERNAME.github.io/coach/Coach.html`

### Updates pushen

Neue Dateiversion ins Repo hochladen (oder via Git pushen). GitHub Pages aktualisiert automatisch in ca. 1 Minute.

**Wichtig:** Wenn du nur die Coach.html änderst, wird der Service-Worker die alte Version noch cachen. Damit Updates ankommen, gibt es zwei Wege:
- Im Browser hart neu laden (Strg+Shift+R / Cmd+Shift+R)
- Oder die Version in `sw.js` hochzählen: `coach-v1` → `coach-v2` → bei nächstem Besuch wird der Cache geleert

## Dateien

- `Coach.html` — die App selbst (alles in einer Datei, ~4400 Zeilen)
- `manifest.json` — PWA-Konfiguration (Name, Icon, Farbe)
- `sw.js` — Service-Worker für Offline-Funktion
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — App-Icons
- `README.md` — diese Datei

## Datenhaltung

Alle Daten (Spieler, Termine, Übungen, Spielzüge) liegen lokal in der `localStorage` des Browsers. **Nichts** wird an einen Server geschickt. Jede Person, die die URL nutzt, hat ihre eigenen Daten.

Backup über den ↓-Knopf im Header (JSON-Export). Importieren über ↑.

## Bekannte Einschränkungen

- Push-Notifications: nicht möglich ohne Backend
- Sync zwischen Geräten: nicht möglich ohne Backend
- Anmeldung mit Telefon/Email: nicht möglich ohne Backend

Diese Features kommen in einer späteren Phase mit Cloud-Anbindung.
