# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```

docker-compose up -d
```

- El -d, significa **detached**

MongoDB URL Local:

```
mongodb://localhost:27017/entriesDB
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

##LLenar la base de datos con información de pruebas

llamar a :

```
http://localhost:300/api/seed
```
