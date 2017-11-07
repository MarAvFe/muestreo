# Ejecutado desde la raíz del repositorio

set -e
echo "Definiendo uso de Node v8.4.0"

~/.nvm/nvm.sh use v8.4.0
~/.nvm/nvm.sh ls

echo "Iniciando webservice..."
node server.js --gen=true > lastRun.log & servId=$(echo $!)
echo "server.js pid: "$servId
echo "OK"

echo "Reiniciando Base de Datos..."
cd ../baseDeDatos
mysql -u root -p123456 -e "source resetDb.sql;" >> lastRun.log
echo "OK"

echo "Eliminando archivos generados (docs/gen)..."
cd ../webservice
rm -Rf docs/* api/routes/gen
echo "OK"

cd ./generator

echo "Generando funciones de CRUD..."
node crud.js >> lastRun.log
echo "OK"

echo "Generando funciones de procedimientos..."
node procedures.js >> lastRun.log
echo "OK"

echo "Generando documentación..."
cd ..
./docs.sh >> lastRun.log
echo "OK"

echo "Reiniciando webservice..."
echo "Matando webservice ("$servId")..."
kill $servId
echo "OK"
echo
echo "___________________________________"
echo
echo "Inicie el webservice nuevamente con"
echo "$ node server.js"
