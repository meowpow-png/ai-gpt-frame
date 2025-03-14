package org.dsauce.frame;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @GetMapping
    public String test() {
        return "ChatGPT API is running!";
    }
}