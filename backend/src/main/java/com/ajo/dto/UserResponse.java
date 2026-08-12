package com.ajo.dto;

// DTO(data transfer object) class- used to send back response to the network(API/fronend)
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    
    public UserResponse(Long id, String email, String firstName, String lastName ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public Long getId() {
        return id;
    }
    
}
