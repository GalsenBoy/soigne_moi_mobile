# Recuperer le projet en local
<p>Cloner le repo du projet puis install les dépendences</p>

```bash
$ git clone https://github.com/GalsenBoy/soigne_moi
$ npm i
```

# Démarrer le serveur

```bash
$ npx expo start
```

<p>Scanner le qr code générer sur votre téléphone ou si vous utilisez android studio suivre les instruction donées sur le terminal pour l'utilisation d'un émulateur android ou ios</p>

# Utilisation du serveur backend
<p>Pour utiliser le backend de nest avec expo veuillez installer ngrok </p>

```bash
# si vous utilisez windows lancer la commande 
$ choco install ngrok

# si vous utilisez mac os lancer la commande 
$ brew install ngrok/ngrok/ngrok

# si vous utilisez linux lancer la commande
$ sudo tar xvzf ~/Downloads/ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin 
```

# Ensute lancer la commande suivante depuis votre terminale
```bash
$ ngrok htpp 8000
```
<p>Ceci vous générera une adresse que vous allez remplace dans le fichier routes.ts depuis la racine</p>

