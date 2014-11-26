
package com.acme.demo.web;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.Context;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.security.sso.EnableOAuth2Sso;
import org.springframework.cloud.security.sso.OAuth2SsoConfigurerAdapter;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@EnableZuulProxy
@EnableEurekaClient
@EnableOAuth2Sso
public class App implements EmbeddedServletContainerCustomizer {

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }
  
  @Component
  public static class LoginConfigurer extends OAuth2SsoConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
      http.requestMatcher(new SecureRequestMatcher()).authorizeRequests().anyRequest().authenticated();
    }
  }
  
  @Component
  public static class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http.requestMatcher(new AnonRequestMatcher()).anonymous();
    }
    
  }

  @Override
  public void customize(ConfigurableEmbeddedServletContainer container) {
    ((TomcatEmbeddedServletContainerFactory) container).addContextCustomizers(new TomcatContextCustomizer() {
        @Override
        public void customize(Context context) {
            context.setUseHttpOnly(false);
        }
    });
  }
}

class SecureRequestMatcher implements RequestMatcher {
  private Pattern allowedMethods = Pattern.compile("^(POST|PUT|DELETE|HEAD|TRACE|OPTIONS)$");
  private Pattern allowedStatusApis = Pattern.compile("^(/api/status/?[A-za-z0-9]*)$");
  @Override
  public boolean matches(HttpServletRequest request) {
    boolean result = "/api/login".equalsIgnoreCase(request.getRequestURI()) ||
            (allowedStatusApis.matcher(request.getRequestURI()).matches() && allowedMethods.matcher(request.getMethod()).matches());
    return result;
  }
  
}

class AnonRequestMatcher implements RequestMatcher {

  @Override
  public boolean matches(HttpServletRequest request) {
    boolean result = "/api/status".equalsIgnoreCase(request.getRequestURI()) && request.getMethod().equals("GET") || 
            "/csrf".equalsIgnoreCase(request.getRequestURI()) && request.getMethod().equals("GET") ||
            "/logout".equalsIgnoreCase(request.getRequestURI());
    return result;
  }
  
}