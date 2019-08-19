package com.illdangag.oauth.repository.model.type;

public enum UserAuthority {
    ADMIN("ADMIN"),
    CLIENT_ADMIN("CLIENT_ADMIN");

    private String value;

    private UserAuthority(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    static public UserAuthority toEnum(String value) {
        if (value.equals("ADMIN")) {
            return UserAuthority.ADMIN;
        } else if (value.equals("CLIENT_ADMIN")) {
            return UserAuthority.CLIENT_ADMIN;
        }
        return null;
    }
}
