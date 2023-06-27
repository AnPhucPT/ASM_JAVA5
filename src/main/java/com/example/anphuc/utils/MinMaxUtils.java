package com.example.anphuc.utils;

import java.util.HashMap;
import java.util.Map;

public class MinMaxUtils {
    public static Map<String, Integer> toMinMax (Integer min, Integer max){
        Map<String, Integer> res = new HashMap<>();
        res.put("min", min);
        res.put("max", max);
        return res;
    }
}
