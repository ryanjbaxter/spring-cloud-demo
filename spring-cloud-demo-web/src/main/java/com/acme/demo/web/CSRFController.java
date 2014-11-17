/*
 * Copyright IBM Corp. 2014
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.acme.demo.web;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CSRFController {
  
  @RequestMapping("/csrf")
  public Map<String, Boolean> auth(Principal principal, ServletRequest request, HttpServletResponse response) {
    CsrfToken token = (CsrfToken) request.getAttribute("_csrf");
    Map<String, Boolean> result = new HashMap<String, Boolean>();
    if(principal == null || token == null) {
      result.put("authenticated", false);
    } else {
      //  Spring Security will allow the Token to be included in this header name
      response.setHeader("X-CSRF-HEADER", token.getHeaderName());
      // Spring Security will allow the token to be included in this parameter name
      response.setHeader("X-CSRF-PARAM", token.getParameterName());
      // this is the value of the token to be included as either a header or an HTTP parameter
      response.setHeader("X-CSRF-TOKEN", token.getToken());
      response.setHeader("X-USER-NAME", principal.getName());
      result.put("authenticated", true);
    }
    return result;
  }
}

