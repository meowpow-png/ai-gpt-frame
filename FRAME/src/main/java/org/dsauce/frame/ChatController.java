package org.dsauce.frame;

import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;

import okhttp3.Response;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    static class ChatRequest {
        public String message;
    }

    static class ChatResponse {
        public String response;
    }

    @PostMapping
    public ChatResponse chat(@org.springframework.web.bind.annotation.RequestBody ChatRequest request) throws IOException {

        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.get("application/json; charset=utf-8");

        String jsonBody = """
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": "%s"}]
            }
            """.formatted(request.message);

        RequestBody requestBody = RequestBody.create(jsonBody, mediaType);

        Request httpRequest = new Request.Builder()
                .url(OPENAI_URL)
                .post(requestBody)
                .addHeader("Authorization", "Bearer " + openaiApiKey)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(httpRequest).execute()) {
            ChatResponse chatResponse = new ChatResponse();
            chatResponse.response = response.body().string();
            return chatResponse;
        }
    }
}