package com.arcanaweb.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // orientando o spring q é uma classe de configuração da api
public class CorsConfig implements WebMvcConfigurer { // WebMvcConfigurer é uma interface q permite alterar e criar regras pra uso e consumo da API

    @Override
    public void addCorsMappings(CorsRegistry registro){ // metodo da interface q estamos definindo as regras
        registro.addMapping("/api/**")                  // aplicar regra a todas as rotas q começam com api
                .allowedOrigins("http://localhost:5173",
                                "https://arcana-web.vercel.app")          // so permite requisições vinda desta url
                .allowedMethods("GET","POST","PUT","DELETE")      // os tipos de metodos q nosas api trabalha
                .allowedHeaders("*");                             // permite qualquer cabeçalho http
    }


}
