package com.acme.demo.status;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Status {

  private String status;
  @Id
  @GeneratedValue
  private long id;
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  public long getId() {
    return id;
  }
}

