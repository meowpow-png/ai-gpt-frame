plugins {
    id("org.springframework.boot") version "3.2.2"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.github.node-gradle.node") version "3.5.1"
    id("java")
}

group = "ai.senthora"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

node {
    version.set("22.0.0")
    npmVersion.set("9.5.0")
    download.set(true)
}
tasks.register<Exec>("dockerBuildFrontend") {
    dependsOn("installFrontend")
    workingDir = file("${project.projectDir}/frontend")
    commandLine("docker", "build", "-t", "react-frontend", ".")
}

tasks.register<Exec>("dockerRunFrontend") {
    dependsOn("dockerBuildFrontend")
    commandLine(
        "docker", "run",
        "-p", "5173:5173",         // Map Vite port for external access
        "-v", "${projectDir}/frontend:/app",  // Mount frontend directory
        "-w", "/app",              // Set working directory inside container
        "--rm",                    // Auto-remove container on exit
        "node:18-alpine",          // Use a lightweight Node.js image
        "sh", "-c", "npm install && npm run dev:docker"
    )
}

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    mainClass.set("ai.senthora.frame.FrameAIApplication")
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.squareup.okhttp3:okhttp:4.9.3")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.15.3")
}

tasks.test {
    useJUnitPlatform()
}