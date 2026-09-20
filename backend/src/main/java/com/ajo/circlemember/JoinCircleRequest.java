package com.ajo.circlemember;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinCircleRequest {
    private String inviteCode;
    private Long userId;
}


