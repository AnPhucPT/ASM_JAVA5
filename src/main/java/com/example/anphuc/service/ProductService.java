package com.example.anphuc.service;

import com.example.anphuc.payload.request.ProductQueryParam;
import com.example.anphuc.payload.response.APIResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    APIResponse delete (Integer id);
    APIResponse save (String name, Integer price, MultipartFile file, Integer id);
    APIResponse update (Integer id, String name, Integer price, MultipartFile file, Integer categoryId);
    APIResponse filterProduct (ProductQueryParam productQueryParam);

    APIResponse getMinMax ();
}
