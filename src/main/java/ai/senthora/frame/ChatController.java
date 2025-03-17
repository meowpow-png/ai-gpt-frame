package ai.senthora.frame;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;

import okhttp3.Response;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from frontend
public class ChatController {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private static final Path INSTRUCTIONS_DIR_PATH = Paths.get("instructions");
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private final String AI_INSTRUCTIONS;
    {
        AI_INSTRUCTIONS = String.join("\n\n", readInstructions(INSTRUCTIONS_DIR_PATH));
    }
    static class ChatRequest {
        public String message;
    }

    static class ChatResponse {
        public String response;
    }

    public static ArrayList<String> readInstructions(Path dir) {
        try (Stream<Path> files = Files.list(dir)) {
            return files
                    .filter(Files::isRegularFile)
                    .map(path -> {
                        try {
                            return Files.readString(path, StandardCharsets.UTF_8);
                        } catch (IOException e) {
                            throw new RuntimeException("Error reading file: " + path, e);
                        }
                    })
                    .collect(Collectors.toCollection(ArrayList::new));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "Hello from React!";
    }

    @PostMapping
    public ChatResponse chat(@org.springframework.web.bind.annotation.RequestBody ChatRequest request) throws IOException {

        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.get("application/json; charset=utf-8");

        ObjectMapper objectMapper = new ObjectMapper();

        // Create root JSON object
        ObjectNode jsonRoot = objectMapper.createObjectNode();
        jsonRoot.put("model", "gpt-4o-2024-08-06");

        // Create messages array
        ArrayNode messagesArray = objectMapper.createArrayNode();
        messagesArray.add(objectMapper.createObjectNode().put("role", "system").put("content", AI_INSTRUCTIONS));
        messagesArray.add(objectMapper.createObjectNode().put("role", "user").put("content", request.message));

        // Attach messages array to root
        jsonRoot.set("messages", messagesArray);

        // Convert object to JSON string
        String jsonBody = objectMapper.writeValueAsString(jsonRoot);

        RequestBody requestBody = RequestBody.create(jsonBody, mediaType);

        Request httpRequest = new Request.Builder()
                .url(OPENAI_URL)
                .post(requestBody)
                .addHeader("Authorization", "Bearer " + openaiApiKey)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(httpRequest).execute()) {
            String jsonResponse = response.body().string();

            // Extract only the AI message
            String botReply = new com.fasterxml.jackson.databind.ObjectMapper()
                    .readTree(jsonResponse)
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            ChatResponse chatResponse = new ChatResponse();
            chatResponse.response = botReply;
            return chatResponse;
        }
    }
}