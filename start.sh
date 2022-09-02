echo "web ini hanya untuk pembelajaran, semua data dari web ini diambil dari komikindo.id"


apt update && apt upgrade
pkg install nodejs-lts -y
pkg install yarn
yarn


echo "Todo: fix bypass cloudflare"
yarn start
