package org.centrale.hceres.controller;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ReviewArticle;
import org.centrale.hceres.service.ReviewService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class ReviewController {

    @Autowired
    ReviewService reviewService;



    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/ReviewArticles")
    public List<Activity> getReviewArticle() {
        return reviewService.getReviewArticle();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/ReviewArticle/Create")
    public Activity createReviewArticle(@RequestBody Map<String, Object> request) throws RequestParseException {
        return reviewService.saveReviewArticle(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/ReviewArticle/Delete/{id}")

    public void deleteReviewArticle(@RequestBody @PathVariable("id") final Integer id) {
        reviewService.deleteReviewArticle(id);
    }
}
