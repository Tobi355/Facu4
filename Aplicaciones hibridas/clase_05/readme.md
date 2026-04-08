# Inicializar repositorio git

inicializa el repositorio
git init  
Le dice a git donde tiene que subir el codigo
git remote add origin https://github.com/victor-villafane/DWM4AV.git
Le digo que archivos quiero pasar al working directory
git add . -> sube todo
git add clase_02/readme.md

# Inicializar proyecto

npm init -y
npm i nodemon -D -E

"dev": "nodemon app/main.js"