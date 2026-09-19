// package com.ajo.circlemember;
package com.ajo.circlemember;
// import lombok.Getter;
// import lombok.Setter;

// @Getter
// @Setter
// public class JoinCircleRequest {
//     private String inviteCode;
//     private Long userId;
// }


public class JoinCircleRequest {
    private String inviteCode;
    private Long userId;

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
