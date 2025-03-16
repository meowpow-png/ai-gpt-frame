package ai.senthora.frame;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import java.io.IOException;
import java.nio.file.*;
import java.util.Comparator;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class ChatControllerTest {

    private static Path tempInstructionsDir = Path.of("instructions");

    @BeforeAll
    public static void setup() throws IOException {
        // Create a temporary directory for instructions
        tempInstructionsDir = Files.createTempDirectory("testInstructions");
        // Create sample instruction files
        Files.writeString(tempInstructionsDir.resolve("instruction1.txt"), "Test instruction 1");
        Files.writeString(tempInstructionsDir.resolve("instruction2.txt"), "Test instruction 2");
    }

    @AfterAll
    public static void cleanup() throws IOException {
        // Delete temporary directory and its files
        Files.walk(tempInstructionsDir)
                .sorted(Comparator.reverseOrder())
                .forEach(path -> path.toFile().delete());
    }

    @Test
    public void testChatControllerLoadsInstructions() {
        // Return a list of AI instructions
        List<String> instructions = ChatController.readInstructions(tempInstructionsDir);

        // Verify that both instructions have been loaded
        assertNotNull(instructions, "Instructions list should not be null");
        assertEquals(2, instructions.size(), "Should load two instruction files");
        assertTrue(instructions.contains("Test instruction 1"), "Missing first instruction");
        assertTrue(instructions.contains("Test instruction 2"), "Missing second instruction");
    }
}
