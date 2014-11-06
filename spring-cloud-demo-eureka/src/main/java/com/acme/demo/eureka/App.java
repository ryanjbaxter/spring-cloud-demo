package com.acme.demo.eureka;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@EnableEurekaServer
public class App {

  public static void main(String[] args) {
    new SpringApplicationBuilder(App.class).web(true).run(args);
  }
}

