plugins {
    id("org.springframework.boot") version "3.2.2"
    id("io.spring.dependency-management") version "1.1.4"
    id("java")
}

group = "org.dsauce"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    mainClass.set("org.dsauce.frame.api.ChatGptApiApplication")
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation("org.springframework.boot:spring-boot-starter-web")
}

tasks.test {
    useJUnitPlatform()
}