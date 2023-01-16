Documentación de uso

## Requisitos

- Node.js 18
- Minikube
- Kubectl

## Instalación

Instalar [AWS CLI](https://aws.amazon.com/es/cli/) y luego configurar una cuenta de AWS.
```bash
# Configure sus credenciales:
$ aws configure
# Instalando dependencias
$ npm install
```

Instalar [Minikube](https://minikube.sigs.k8s.io/docs/start/).
```bash
# Encender Minikube
$ minikube start
# Revisar estado
$ minikube status
```

Instalar [Kubectl](https://kubernetes.io/docs/tasks/tools/).

## Ejecución en Docker
```bash
# Generar build de API
$ docker build -t tokens .
# Creamos red para conectarnos con MongoDB
$ docker network create tokensNet
# Levantamos la BD en Docker
$ docker run --name=mongo --rm --network=tokensNet -d mongo
# Levantamos el proyecto con Docker
$ docker run --name=tokens --rm --network=tokensNet -p 8080:8080 -e URI_DB='mongodb://mongo:27017/tokenizacion_culqi?authSource=admin' -e JWT_SECRET='123456' -e JET_EXPIRED='60s' -d tokens
```

## Ejecución en Kubernetes
```bash
# Estar en el proyecto y mandar las los yaml a Kubernetes
$ kubectl apply -f kube
# Verificar si pasaron correctamente
$ kubectl get pods --watch
# Ingresar al servicio llamado tokens
$ minikube service tokens --url
# Se generará un Link del API
```

## Pruebas unitarias
Para ejecutar pruebas ingresar el siguiente comando
```bash
$ npm run test
```
![My Image](capturas/tests.png)

## Postman

Documentación en [Postman](https://documenter.getpostman.com/view/11052226/2s8ZDU4PNt#0ff1ad78-cf25-443b-ad3d-48248cdcc314)

https://documenter.getpostman.com/view/11052226/2s8ZDU4PNt#0ff1ad78-cf25-443b-ad3d-48248cdcc314

## EKS

Url de [API](http://a17257ed9807649868c50b2b75875bf8-303381690.us-east-1.elb.amazonaws.com)

http://a17257ed9807649868c50b2b75875bf8-303381690.us-east-1.elb.amazonaws.com
