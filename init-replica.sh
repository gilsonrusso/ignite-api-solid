#!/bin/bash
set -e
echo "⏳ Aguardando instâncias MongoDB..."
sleep 10

MONGOSH="mongosh --host 127.0.0.1 --port 27017"

echo "🔁 Aguardando mongod estar responsivo..."
for i in {1..30}; do
  if $MONGOSH --eval "db.adminCommand('ping')" >/dev/null 2>&1; then
    echo "mongod está respondendo"
    break
  fi
  echo "aguardando mongod... ($i)"
  sleep 2
done

echo "⚙️ Verificando estado do ReplicaSet e iniciando se necessário..."
# Só inicia se ainda não houver configuração
if ! $MONGOSH --eval "rs.status()" >/dev/null 2>&1; then
  $MONGOSH <<'EOF'
cfg = {
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
}
try {
  rs.initiate(cfg)
  print('rs.initiate called')
} catch (e) {
  print('rs.initiate error: ' + tojson(e))
}
EOF
else
  echo "ReplicaSet já configurado"
fi

echo "🧩 Aguardando PRIMARY e checando saúde/autenticação dos membros..."

# Espera até existirem membros e um PRIMARY
for i in {1..60}; do
  PRIMARY=$($MONGOSH --quiet --eval "try{var s=rs.status(); var p=s.members.filter(m=>m.stateStr=='PRIMARY'); print(p.length);}catch(e){print('err');}")
  if [[ "$PRIMARY" =~ ^[0-9]+$ ]] && [ "$PRIMARY" -ge 1 ]; then
    echo "PRIMARY detectado"
    break
  fi
  echo "aguardando PRIMARY... ($i)"
  sleep 2
done

# Se um keyfile está presente montado, exigimos que os membros se autentiquem entre si
NEED_AUTH_CHECK=false
if [ -f /data/mongo-keyfile/mongo-key ]; then
  NEED_AUTH_CHECK=true
fi

echo "🔁 Aguardando membros com health=1 e (autenticados se keyFile presente)..."
for i in {1..60}; do
  if $MONGOSH --quiet --eval "
    try {
      var s = rs.status();
      if (!s.members) { print('false'); }
      else {
        var ok = s.members.every(function(m){
          var healthOk = (m.health==1);
          if (${NEED_AUTH_CHECK}); then
            return healthOk && (m.authenticated===true);
          } else {
            return healthOk;
          }
        });
        print(ok);
      }
    } catch(e) { print('false'); }
  " | grep -q "true" >/dev/null 2>&1; then
    echo "Todos os membros estão saudáveis e autenticados (quando exigido)."
    break
  fi
  echo "aguardando membros saudáveis/autenticados... ($i)"
  sleep 2
done

echo "🔎 Verificando se usuário admin existe..."
if $MONGOSH --quiet --eval "db.getSiblingDB('admin').getUser('docker')" | grep -q "null"; then
  echo "🔐 Criando usuário admin 'docker'..."
  $MONGOSH <<'JS'
use admin
db.createUser({ user: "docker", pwd: "docker", roles: [ { role: "root", db: "admin" } ] })
JS
  echo "usuário admin criado"
else
  echo "usuario admin já existe"
fi

echo "✅ Replica Set configurado!"
