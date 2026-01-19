package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.service.BookService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class BookController {

    @Autowired
    BookService bookService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/Books")
    public List<Activity> getBook() {
        return bookService.getBooks();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/Book/Create")
    public Activity createBook(@RequestBody Map<String, Object> request) throws RequestParseException {
        return bookService.saveBook(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/Book/Delete/{id}")
    public void deleteBook(@RequestBody @PathVariable("id") final Integer id) {
        bookService.deleteBook(id);
    }
}
