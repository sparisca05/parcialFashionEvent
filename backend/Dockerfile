FROM openjdk:19-jdk-alpine

WORKDIR /backend

COPY pom.xml /backend
COPY .mvn /backend/.mvn
COPY mvnw /backend
COPY .env /backend

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# COPIAR EL CODIGO FUENTE DENTRO DEL CONTENEDOR
COPY src /backend/src

# CONSTRUIR NUESTRA APLICACION
RUN ./mvnw clean install -DskipTests

# EJECUTAR LA APLICACION
CMD ["java", "-jar", "target/parcialFashionEvent-0.0.1-SNAPSHOT.jar"]
