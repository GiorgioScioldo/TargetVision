# TargetVision — Build automatica APK Android

Questo progetto contiene tutto il necessario per produrre automaticamente l'APK Android dell'app TargetVision tramite **GitHub Actions**, senza dover installare nulla sul tuo computer.

---

## Cosa fa il sistema

Ogni volta che fai un `git push` su questo repository:

1. GitHub avvia un server Linux gratuito
2. Il server scarica Android SDK, compila il codice
3. Produce un file `app-debug.apk` pronto da installare sul telefono
4. L'APK viene allegato a una **Release** automatica del repository
5. Puoi scaricarlo direttamente dal tuo telefono

Il tempo totale per ogni build è di circa **5 minuti**.

---

## Setup iniziale (una volta sola)

### 1. Crea un account GitHub (se non ce l'hai)

Vai su https://github.com/signup e crea un account gratuito.

### 2. Crea un nuovo repository

- Clicca sul "+" in alto a destra → **New repository**
- Nome: `targetvision` (o quello che preferisci)
- Visibilità: **Public** oppure **Private** (entrambe funzionano per la build gratuita)
- NON inizializzare con README, .gitignore o licenza
- Clicca **Create repository**

### 3. Carica i file del progetto

Hai due strade. La più semplice è via browser:

#### Strada A — Upload via browser (consigliata se non usi git)

1. Nel repository appena creato, clicca **"uploading an existing file"** (link al centro della pagina)
2. Trascina tutti i file di questo progetto nella finestra del browser:
   - `package.json`
   - `capacitor.config.js`
   - `.gitignore`
   - cartella `www/` (con dentro `index.html`)
   - cartella `.github/` (con dentro `workflows/build-apk.yml`)
3. Scrivi un messaggio come "Setup iniziale" nel campo Commit
4. Clicca **Commit changes**

#### Strada B — Upload via git (se sei pratico)

```bash
cd targetvision-progetto
git init
git add .
git commit -m "Setup iniziale"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/targetvision.git
git push -u origin main
```

### 4. Autorizza la creazione delle release

Vai in **Settings → Actions → General** del tuo repo:
- In **Workflow permissions** seleziona **"Read and write permissions"**
- Salva

Senza questo passaggio, il workflow non potrà creare le Release.

### 5. Attendi la prima build

- Vai sulla scheda **Actions** del tuo repository
- Vedrai il workflow "Build Android APK" in esecuzione (icona gialla che ruota)
- Dopo circa 5 minuti, l'icona diventa verde ✓ = build riuscita

---

## Scaricare l'APK

Una volta che il workflow è terminato con successo:

### Dal computer

1. Vai sulla scheda **Releases** (in alto a destra del repository)
2. Apri l'ultima release (es. "TargetVision Build 1")
3. Sotto **Assets** trovi `app-debug.apk` — scaricalo

### Direttamente dal telefono Android

1. Sul telefono, apri Chrome
2. Vai all'URL del tuo repository: `https://github.com/TUO_USERNAME/targetvision`
3. Clicca **Releases**
4. Clicca su `app-debug.apk` per scaricarlo

---

## Installare l'APK sul telefono Android

Poiché l'APK non viene dal Play Store, Android richiede un'autorizzazione esplicita:

1. Apri il file `app-debug.apk` scaricato (dalla notifica di download o da Esplora File)
2. Android mostrerà: *"Per la tua sicurezza, il telefono non può installare app sconosciute da questa sorgente"*
3. Tocca **Impostazioni** in quel popup
4. Attiva **"Consenti da questa sorgente"** per Chrome
5. Torna indietro e tocca **Installa**

L'app comparirà nel launcher con il nome **TargetVision** e una icona standard. Questo passaggio va fatto una volta sola per Chrome.

---

## Aggiornare l'app

Quando vuoi modificare qualcosa (es. cambiare un parametro, aggiungere una feature):

1. Modifica il file `www/index.html` direttamente su GitHub:
   - Apri il file sul sito web
   - Clicca l'icona della matita (in alto a destra del file)
   - Modifica
   - In fondo, clicca **Commit changes**
2. GitHub avvia automaticamente una nuova build
3. Dopo 5 minuti, una nuova Release con il nuovo APK è disponibile
4. Scaricala e installala (sostituisce la versione precedente automaticamente)

---

## Build manuale

Se vuoi forzare una nuova build senza modificare nulla:

1. Vai su **Actions**
2. Clicca **"Build Android APK"** nel menu sinistro
3. In alto a destra, clicca **"Run workflow"** → **Run workflow**

---

## Cosa fa l'app

Esattamente quello che fa la versione web attualmente:

- Apre la fotocamera posteriore del telefono
- Mostra a schermo intero il flusso video
- Cursori laterali per zoom (1×–6×), durata (1–5s), diametro cerchi, tolleranza
- Rilevamento automatico dei nuovi colpi sul bersaglio
- Bottone snapshot in basso a destra che salva direttamente in **galleria** nella cartella `TargetVision` (senza popup né conferme — silenzioso)
- Bottone fullscreen accanto

**Vantaggio rispetto alla versione web:**
- Icona nel launcher come una vera app
- Nessuna barra del browser
- Snapshot completamente silenzioso (la notifica "file scaricato" del browser non compare più)
- Niente più chiusura della scheda Chrome per sbaglio

---

## Possibili problemi

### "Il workflow è in errore"

Apri la scheda **Actions**, clicca sul run fallito, leggi il log. I problemi più comuni:

- **"Permission to repository denied"**: hai dimenticato il punto 4 del setup (Read and write permissions).
- **Build Gradle fallisce**: probabilmente Capacitor ha pubblicato una versione nuova che richiede un'altra versione di Java o Android SDK. In genere basta riavviare il workflow.

### "L'app si avvia ma la camera non parte"

Al primo avvio Android chiede il permesso fotocamera. Se per errore lo neghi:

- Apri **Impostazioni telefono** → **App** → **TargetVision** → **Autorizzazioni** → **Fotocamera** → consenti
- Riavvia l'app

### "Le foto non compaiono in Galleria"

Google Foto indicizza la cartella `Pictures/TargetVision/` automaticamente entro pochi secondi. Se non vedi le foto:

- Apri Google Foto, scendi tutto in fondo → **Cartelle del dispositivo** → cerca "TargetVision"
- Se non c'è, tocca il file con un'app di gestione file: `Memoria interna → Pictures → TargetVision → TSN_*.jpg`

---

## Versione iOS

Non inclusa in questo progetto. Richiede:
- Un Mac fisico con Xcode (oppure runner macOS su GitHub Actions, gratuito ma limitato)
- Account Apple Developer (99 €/anno) per installare e mantenere l'app sul tuo iPhone
- Configurazione signing certificates + provisioning profiles

Se in futuro vorrai aggiungere iOS, fammelo sapere e prepariamo l'estensione del progetto.
