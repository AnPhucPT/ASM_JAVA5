package com.example.anphuc.interceptor;

import com.example.anphuc.exception.EntityNotFoundException;
import com.example.anphuc.exception.TokenException;
import com.example.anphuc.model.Account;
import com.example.anphuc.repository.AccountDAO;
import com.example.anphuc.utils.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class TokenInterceptor implements HandlerInterceptor {
    @Autowired
    TokenProvider tokenProvider;
    @Autowired
    AccountDAO accountDAO;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = getTokenFromRequest(request);
        String uri = request.getRequestURI();
//        Observer pattern
        if(uri.startsWith("/api/public")){
            return true;
        }else{
            if(token !=null){
                try {
                    tokenProvider.validateToken(token);
                    Integer userId = tokenProvider.getIdFromToken(token);
                    Account account = accountDAO.findById(userId).orElseThrow(() -> {
                        throw new EntityNotFoundException("User not found");
                    });
                    request.setAttribute("user", account);
                    if(uri.startsWith("/api/admin") || uri.startsWith("/admin") && !account.getAdmin()){
                        return false;
                    }
                    return true;
                }catch (Exception ex){
                    throw new TokenException(ex.getMessage());
                }
            }else{
                throw new TokenException("Empty token!");
            }
        }
    }

    public String getTokenFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
