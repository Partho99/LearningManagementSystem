package com.lms.authorizationserver.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.TokenRequest;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.TokenStore;

import java.util.Map;

public class CustomOauth2RequestFactory extends DefaultOAuth2RequestFactory {


    private TokenStore tokenStore;
    private UserDetailsService userDetailsService;

    public CustomOauth2RequestFactory(ClientDetailsService clientDetailsService) {
        super(clientDetailsService);
    }

    @Autowired
    public void setTokenStore(TokenStore tokenStore) {
        this.tokenStore = tokenStore;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }



    @Override
    public TokenRequest createTokenRequest(Map<String, String> requestParameters,
                                           ClientDetails authenticatedClient) {
        if (requestParameters.get("grant_type").equals("refresh_token")) {
            OAuth2Authentication authentication = tokenStore.readAuthenticationForRefreshToken(
                    tokenStore.readRefreshToken(requestParameters.get("refresh_token")));
            SecurityContextHolder.getContext()
                    .setAuthentication(new UsernamePasswordAuthenticationToken(authentication.getName(), null,
                            userDetailsService.loadUserByUsername(authentication.getName()).getAuthorities()));
        }
        return super.createTokenRequest(requestParameters, authenticatedClient);
    }
}
