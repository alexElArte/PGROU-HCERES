package org.centrale.hceres.controller;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.PostDoc;
import org.centrale.hceres.service.PostDocService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class PostDocController {

    @Autowired
    private PostDocService postDocService;



    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/PostDocs")
    public List<Activity> getPostDocs() {
        return postDocService.getPostDocs();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/PostDoc/Create")
    public Activity createPostDoc(@RequestBody Map<String, Object> request) throws RequestParseException {
        return postDocService.savePostDoc(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/PostDoc/Delete/{id}")

    public void deletePostDoc(@RequestBody @PathVariable("id") final Integer id) {
        postDocService.deletePostDoc(id);
    }
}
